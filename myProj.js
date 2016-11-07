function getUtility(effort, salary, identity, starEffort) {
  console.log("Effort" + effort);
  console.log("Salary" + salary);
  console.log("Idenity"+identity);
  console.log("Star"+Math.abs(effort - starEffort));
  var util = salary - effort + identity - Math.abs(effort - starEffort);
  var utilScale = d3.scale.linear().domain([-100,100]).range([0,100]);
  return utilScale(util);
}
