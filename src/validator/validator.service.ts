const phones = {
  'zh-CN': /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
  'en-ZA': /^(\+?27|0)\d{9}$/,
  'en-AU': /^(\+?61|0)4\d{8}$/,
  'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
  'pt-PT': /^(\+351)?9[1236]\d{7}$/,
  'el-GR': /^(\+?30)?(69\d{8})$/,
  'en-GB': /^(\+?44|0)7\d{9}$/,
  'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
  'en-ZM': /^(\+26)?09[567]\d{7}$/,
  'ru-RU': /^(\+?7|8)?9\d{9}$/,
  'nb-NO': /^(\+?47)?[49]\d{7}$/,
  'nn-NO': /^(\+?47)?[49]\d{7}$/,
  'vi-VN': /^(0|\+?84)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
  'en-NZ': /^(\+?64|0)2\d{7,9}$/
};
export function isPhone(value?: any, locale?: any): boolean {
  let pattern = phones[locale] || phones['zh-CN'];
  return (new RegExp(pattern)).test(value);
}

export function isEmail(value?: any): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
}

export function isPassword(value?: any): boolean {
  return /^[\s\S]{6,20}$/.test(value);
}

export function isPositiveInteger(value?: any): boolean {
  return /^[1-9]\d*$/.test(value);
}
