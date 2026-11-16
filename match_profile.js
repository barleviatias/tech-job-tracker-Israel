const SKILL_LABELS = {
  'material planning': 'תכנון חומרים',
  procurement: 'רכש',
  'inventory management': 'ניהול מלאי',
  'bill of materials': 'BOM',
  erp: 'ERP',
  sap: 'SAP',
  'supplier coordination': 'עבודה מול ספקים',
  'project management': 'ניהול פרויקטים',
  'process improvement': 'שיפור תהליכים',
  'cross-functional coordination': 'עבודה בין צוותים',
  excel: 'Excel',
  'power query': 'Power Query',
  'power bi': 'Power BI',
  sql: 'SQL',
  'kpi reporting': 'מדדי ביצוע'
};

function getJobMatch(job, profile) {
  if (!profile || !Array.isArray(profile.skills)) return null;

  const jobSkills = [...new Set(Array.isArray(job.skill_tags) ? job.skill_tags : [])]
    .filter(skill => typeof skill === 'string');
  if (jobSkills.length === 0) {
    return { rank: 0, label: 'מידע חלקי', explanation: 'אין עדיין מספיק פרטי משרה לדירוג' };
  }

  const profileSkills = new Set(profile.skills);
  const matched = jobSkills.filter(skill => profileSkills.has(skill));
  const coverage = matched.length / jobSkills.length;
  const rank = matched.length >= 2 && coverage >= 0.6 ? 3 : matched.length > 0 ? 2 : 1;
  const label = rank === 3 ? 'התאמה גבוהה' : rank === 2 ? 'התאמה בינונית' : 'כדאי לבדוק';
  const explanation = matched.length
    ? `כישורים משותפים: ${matched.slice(0, 3).map(skill => SKILL_LABELS[skill] || skill).join(', ')}`
    : 'לא זוהו כישורים משותפים מתוך פרטי המשרה';
  return { rank, label, explanation };
}

if (typeof module !== 'undefined') module.exports = { getJobMatch };
