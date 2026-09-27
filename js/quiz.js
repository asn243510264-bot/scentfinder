/* =========================================================
   ScentFinder – quiz.js
   The Scent Quiz (quiz.html).
   1. Questions
   2. Scoring: how well each perfume matches the answers
   3. Rendering the questions and the results

   How the score works (out of 100):
     Scent style ... 35 points
     Budget ........ 25 points
     Occasion ...... 20 points
     Strength ...... 15 points
     Popularity .... up to 5 points (breaks ties)
   Gender is a filter: "Him" shows men's + unisex perfumes,
   "Her" shows women's + unisex perfumes.
   ========================================================= */

'use strict';

/* ---------------------------------------------------------
   1. QUESTIONS
   --------------------------------------------------------- */
const QUIZ_QUESTIONS = [
  {
    id: 'gender',
    title: 'Who is the perfume for?',
    hint: 'Unisex perfumes are included for everyone.',
    options: [
      { value: 'Men', label: 'Him', desc: 'Men\'s and unisex perfumes' },
      { value: 'Women', label: 'Her', desc: 'Women\'s and unisex perfumes' },
      { value: 'any', label: 'Anyone', desc: 'Show me every perfume' }
    ]
  },
  {
    id: 'budget',
    title: 'What is your budget?',
    hint: 'Based on the estimated starting price in Malaysia.',
    options: [
      { value: '0-300', label: 'Under RM300', desc: 'Great value picks' },
      { value: '300-600', label: 'RM300 to RM600', desc: 'Most designer perfumes' },
      { value: '600-1000', label: 'RM600 to RM1,000', desc: 'Premium designer' },
      { value: '1000-100000', label: 'RM1,000 and above', desc: 'Niche and luxury houses' },
      { value: 'any', label: 'No limit', desc: 'Price doesn\'t matter' }
    ]
  },
  {
    id: 'scent',
    title: 'Which kind of scent do you enjoy most?',
    hint: 'Think of a smell you already love, like a candle, a food or a place.',
    options: [
      { value: 'fresh', label: 'Fresh & clean', desc: 'Citrus, sea air, crisp and light' },
      { value: 'sweet', label: 'Sweet & warm', desc: 'Vanilla, caramel, coffee, spice' },
      { value: 'floral', label: 'Floral & soft', desc: 'Rose, jasmine, fruity flowers' },
      { value: 'woody', label: 'Woody & deep', desc: 'Sandalwood, oud, cedar, tobacco' }
    ]
  },
  {
    id: 'occasion',
    title: 'When will you wear it most?',
    hint: 'Pick the one that fits best.',
    options: [
      { value: 'daily', label: 'Every day', desc: 'Class, office, running errands' },
      { value: 'night', label: 'Night out', desc: 'Dinners, dates, parties' },
      { value: 'formal', label: 'Special events', desc: 'Weddings, formal dinners, celebrations' },
      { value: 'outdoor', label: 'Outdoors & active', desc: 'Hot days, sports, holidays' }
    ]
  },
  {
    id: 'strength',
    title: 'How strong should it be?',
    hint: 'Strength here means sillage: how far the scent travels around you.',
    options: [
      { value: 'Soft', label: 'Soft', desc: 'Close to the skin, only people near you notice' },
      { value: 'Moderate', label: 'Noticeable', desc: 'A pleasant trail without being loud' },
      { value: 'Strong', label: 'Bold', desc: 'Long-lasting and easy to notice' }
    ]
  }
];

/* Which fragrance families fit each scent answer */
const QUIZ_SCENT_FAMILIES = {
  fresh: { best: ['Fresh', 'Aquatic'], close: ['Aromatic', 'Chypre'], words: 'fresh, clean' },
  sweet: { best: ['Gourmand', 'Amber'], close: ['Floral'], words: 'sweet, warm' },
  floral: { best: ['Floral'], close: ['Chypre', 'Gourmand'], words: 'floral' },
  woody: { best: ['Woody'], close: ['Aromatic', 'Amber'], words: 'woody, deep' }
};

/* Which occasions in the data belong to each answer */
const QUIZ_OCCASIONS = {
  daily: ['Daily wear', 'Office', 'Casual', 'Brunch'],
  night: ['Night out', 'Date night', 'Parties', 'Evening'],
  formal: ['Formal events', 'Weddings', 'Celebrations', 'Evening'],
  outdoor: ['Outdoor', 'Sports', 'Holidays', 'Casual']
};

const STRENGTH_LEVELS = ['Soft', 'Moderate', 'Strong'];

/* Quiz progress */
let quizStep = 0;
let quizAnswers = {};

/* ---------------------------------------------------------
   2. SCORING
   --------------------------------------------------------- */
/* ["a", "b", "c"] → "a, b and c" */
function joinWithAnd(items) {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

function formatRM(amount) {
  return `RM${amount.toLocaleString('en-MY')}`;
}

function scorePerfume(perfume, answers) {
  let score = 0;
  const reasons = [];

  // Scent style (35)
  const scent = QUIZ_SCENT_FAMILIES[answers.scent];
  if (scent.best.includes(perfume.fragranceFamily)) {
    score += 35;
    reasons.push(`${perfume.fragranceFamily} scent, a direct match for the ${scent.words} style you like`);
  } else if (scent.close.includes(perfume.fragranceFamily)) {
    score += 18;
    reasons.push(`${perfume.fragranceFamily} scent, close to the ${scent.words} style you like`);
  }

  // Budget (25)
  if (answers.budget === 'any') {
    score += 25;
  } else {
    const [min, max] = answers.budget.split('-').map(Number);
    if (perfume.priceMin >= min && perfume.priceMin < max) {
      score += 25;
      reasons.push(`Starts from about ${formatRM(perfume.priceMin)}, within your budget`);
    } else if (perfume.priceMin < min) {
      score += 15;
      reasons.push(`Starts from about ${formatRM(perfume.priceMin)}, below your budget`);
    } else if (perfume.priceMin < max * 1.2) {
      score += 6;
    }
  }

  // Occasion (20)
  const wanted = QUIZ_OCCASIONS[answers.occasion];
  const matches = perfume.occasions.filter(occasion => wanted.includes(occasion));
  let occasionScore = matches.length ? 10 + matches.length * 5 : 0;
  const suitsHeat = ['Fresh', 'Aquatic', 'Aromatic'].includes(perfume.fragranceFamily)
    && perfume.season.includes('Summer');
  if (answers.occasion === 'outdoor' && suitsHeat) occasionScore += 10;
  score += Math.min(20, occasionScore);

  if (matches.length) {
    reasons.push(`Suited to ${joinWithAnd(matches.map(item => item.toLowerCase()))}`);
  } else if (answers.occasion === 'outdoor' && suitsHeat) {
    reasons.push('Light enough for hot, humid Malaysian weather');
  }

  // Strength (15)
  const difference = Math.abs(STRENGTH_LEVELS.indexOf(perfume.sillage) - STRENGTH_LEVELS.indexOf(answers.strength));
  if (difference === 0) {
    score += 15;
    reasons.push(`${perfume.sillage} projection that lasts about ${perfume.longevity}`);
  } else if (difference === 1) {
    score += 7;
  }

  // Popularity (up to 5)
  score += Math.round((perfume.popularity / 100) * 5);

  return { perfume, score: Math.min(100, score), reasons: reasons.slice(0, 3) };
}

function getQuizResults(answers, count = 3) {
  return PERFUMES
    .filter(perfume => answers.gender === 'any' || perfume.gender === answers.gender || perfume.gender === 'Unisex')
    .map(perfume => scorePerfume(perfume, answers))
    .sort((a, b) => b.score - a.score || b.perfume.popularity - a.perfume.popularity)
    .slice(0, count);
}

/* ---------------------------------------------------------
   3. RENDERING
   --------------------------------------------------------- */
function getOptionLabel(questionId, value) {
  const question = QUIZ_QUESTIONS.find(item => item.id === questionId);
  const option = question.options.find(item => item.value === value);
  return option ? option.label : value;
}

function renderQuizQuestion() {
  const quiz = $('#quiz');
  const question = QUIZ_QUESTIONS[quizStep];
  const total = QUIZ_QUESTIONS.length;
  const progress = Math.round((quizStep / total) * 100);

  quiz.innerHTML = `
    <div class="quiz-step">
      <div class="quiz-progress">
        <span>Question ${quizStep + 1} of ${total}</span>
        <div class="quiz-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${quizStep}" aria-label="Quiz progress">
          <span style="width:${progress}%"></span>
        </div>
      </div>

      <div role="group" aria-labelledby="quiz-title">
        <h2 class="quiz-title" id="quiz-title" tabindex="-1">${question.title}</h2>
        <p class="quiz-hint">${question.hint}</p>
        <div class="quiz-options${question.options.length === 3 ? ' quiz-options-3' : ''}">
          ${question.options.map(option => {
            const selected = quizAnswers[question.id] === option.value;
            return `
              <button class="quiz-option${selected ? ' is-selected' : ''}" type="button" data-answer="${option.value}" aria-pressed="${selected}">
                <span class="quiz-option-label">${option.label}</span>
                <span class="quiz-option-desc">${option.desc}</span>
              </button>`;
          }).join('')}
        </div>
      </div>

      <div class="quiz-nav">
        ${quizStep > 0 ? '<button class="btn btn-ghost btn-sm" type="button" data-quiz-back>Back</button>' : '<span></span>'}
        <span class="muted small">Tap an answer to continue</span>
      </div>
    </div>`;

  // Move focus to the question so keyboard and screen reader users follow along
  $('#quiz-title').focus({ preventScroll: true });
}

function renderQuizResults() {
  const quiz = $('#quiz');
  const results = getQuizResults(quizAnswers);

  const summary = QUIZ_QUESTIONS
    .map(question => `<li class="tag">${getOptionLabel(question.id, quizAnswers[question.id])}</li>`)
    .join('');

  quiz.innerHTML = `
    <div class="quiz-step quiz-results">
      <div class="quiz-results-head">
        <h2 class="quiz-title" id="quiz-title" tabindex="-1">Your top matches</h2>
        <p class="quiz-hint">Based on your answers:</p>
        <ul class="quiz-summary">${summary}</ul>
      </div>

      <ol class="match-list">
        ${results.map((result, index) => {
          const perfume = result.perfume;
          const saved = isFavorite(perfume.id);
          return `
            <li class="match-card" style="--i:${index}">
              <span class="match-rank" aria-hidden="true">${index + 1}</span>
              <img src="${perfume.image}" alt="Bottle illustration for ${escapeHTML(perfume.brand)} ${escapeHTML(perfume.name)}" width="400" height="480">
              <div class="match-body">
                <p class="label">${escapeHTML(perfume.brand)}</p>
                <h3><a href="perfume-details.html?id=${perfume.id}">${escapeHTML(perfume.name)}</a></h3>
                <p class="match-score">
                  <strong>${result.score}% match</strong>
                  <span class="match-meter" aria-hidden="true"><span style="width:${result.score}%"></span></span>
                  <span>${perfume.price}</span>
                </p>
                <ul class="checklist">${result.reasons.map(reason => `<li>${escapeHTML(reason)}</li>`).join('')}</ul>
                <div class="match-actions">
                  <a href="perfume-details.html?id=${perfume.id}" class="btn btn-outline btn-sm">View Details</a>
                  ${compareButtonWithLabel(perfume, 'btn btn-ghost btn-sm')}
                  <button class="btn btn-ghost btn-sm${saved ? ' is-favorite' : ''}" type="button" data-favorite="${perfume.id}" aria-pressed="${saved}">
                    ${icon('heart')}<span class="btn-label">${saved ? 'Saved to favorites' : 'Save to favorites'}</span>
                  </button>
                </div>
              </div>
            </li>`;
        }).join('')}
      </ol>

      <div class="quiz-results-actions">
        <button class="btn btn-gold" type="button" data-quiz-compare>Compare these ${results.length}</button>
        <button class="btn btn-outline" type="button" data-quiz-restart>Retake the quiz</button>
      </div>

      <p class="data-note">
        ${icon('info')}
        Matches come from the ScentFinder catalogue and are a starting point, not a guarantee. Skin chemistry changes how a perfume smells, so try a tester at an official counter before you buy.
      </p>
    </div>`;

  quiz.dataset.results = results.map(result => result.perfume.id).join(',');
  $('#quiz-title').focus({ preventScroll: true });
  quiz.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
}

function initQuizPage() {
  const quiz = $('#quiz');
  if (!quiz) return;

  quiz.addEventListener('click', event => {
    const option = event.target.closest('[data-answer]');
    if (option) {
      const question = QUIZ_QUESTIONS[quizStep];
      quizAnswers[question.id] = option.dataset.answer;

      $all('.quiz-option', quiz).forEach(button => {
        const isThis = button === option;
        button.classList.toggle('is-selected', isThis);
        button.setAttribute('aria-pressed', String(isThis));
      });

      // Short pause so the user sees their choice highlighted
      setTimeout(() => {
        quizStep++;
        if (quizStep < QUIZ_QUESTIONS.length) renderQuizQuestion();
        else renderQuizResults();
      }, prefersReducedMotion ? 0 : 280);
      return;
    }

    if (event.target.closest('[data-quiz-back]')) {
      quizStep = Math.max(0, quizStep - 1);
      renderQuizQuestion();
      return;
    }

    if (event.target.closest('[data-quiz-restart]')) {
      quizStep = 0;
      quizAnswers = {};
      renderQuizQuestion();
      quiz.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      return;
    }

    if (event.target.closest('[data-quiz-compare]')) {
      const ids = quiz.dataset.results.split(',').map(Number);
      saveCompareList(ids);
      window.location.href = 'compare.html';
    }
  });

  renderQuizQuestion();
}
