function getUtility(effort, salary, identity, starEffort) {
  console.log("Effort" + effort);
  console.log("Salary" + salary);
  console.log("Idenity"+identity);
  console.log("Star"+Math.abs(effort - starEffort));

  //Mapping deviation to have more effect on utility. Face will be happier when reaches near group ideal
  // var devScale = d3.scale.linear()
  //                 .domain([100, 0])
  //                 .range([50, -50]);

  var util = salary - effort + identity - Math.abs(effort - starEffort);
  console.log("util" + util);
  var utilScale = d3.scale.linear().domain([-200,200]).range([-50,170]);

  console.log("Scaled util "+ utilScale(util));
  return utilScale(util);
}
