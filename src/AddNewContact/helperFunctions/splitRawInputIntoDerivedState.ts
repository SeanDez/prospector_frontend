import uppercaseIf2OrMore from './uppercase';

/*
  Splits a string by double space '  '
  Then assigns each array item to state based on order
*/
export default (
  rawInputString: string,
  setFirstname: Function,
  setLastName: Function,
  setCompanyName: Function,
  setEmployeeRoleCode: Function,
  setEmail: Function,
  setIntroSentenceBody: Function,
  setContactStrategy: Function,
  setCustomContactChannel: Function,
) => {
  const inputs: string[] = rawInputString.split('  ');

  typeof inputs[0] !== 'undefined' ? setFirstname(inputs[0].trim()) : setFirstname('');
  typeof inputs[1] !== 'undefined' ? setLastName(inputs[1].trim()) : setLastName('');
  typeof inputs[2] !== 'undefined' ? setCompanyName(inputs[2].trim()) : setCompanyName('');
  typeof inputs[3] !== 'undefined' ? setEmployeeRoleCode(inputs[3].trim()) : setEmployeeRoleCode('');
  typeof inputs[4] !== 'undefined' ? setEmail(inputs[4].trim()) : setEmail('');
  typeof inputs[5] !== 'undefined' ? setIntroSentenceBody(inputs[5].trim()) : setIntroSentenceBody('');
  typeof inputs[6] !== 'undefined' ? setContactStrategy(inputs[6].trim()) : setContactStrategy('');
  typeof inputs[7] !== 'undefined' ? setCustomContactChannel(uppercaseIf2OrMore(inputs[7].trim())) : setCustomContactChannel('');
}