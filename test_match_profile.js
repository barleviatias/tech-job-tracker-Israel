const assert = require('node:assert/strict');
const test = require('node:test');
const { getJobMatch } = require('./match_profile');

const profile = { skills: ['procurement', 'excel', 'project management'] };

test('ranks by shared skills without preferring a role family', () => {
  assert.deepEqual(getJobMatch({ skill_tags: ['procurement', 'excel'] }, profile), {
    rank: 3,
    label: 'התאמה גבוהה',
    explanation: 'כישורים משותפים: רכש, Excel'
  });
  assert.deepEqual(getJobMatch({ skill_tags: ['project management', 'sql'] }, profile), {
    rank: 2,
    label: 'התאמה בינונית',
    explanation: 'כישורים משותפים: ניהול פרויקטים'
  });
});

test('does not invent a low score when job details are missing', () => {
  assert.deepEqual(getJobMatch({ skill_tags: [] }, profile), {
    rank: 0,
    label: 'מידע חלקי',
    explanation: 'אין עדיין מספיק פרטי משרה לדירוג'
  });
});
