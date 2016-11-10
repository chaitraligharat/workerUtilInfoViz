
function drawGraph(id, svgWidth, svgHeight) {
  var graphDIV = d3.select('#' + id)
  var padding = 20;

  var graphSVG=graphDIV.append('svg')        // create an <svg> element
      .attr('width', svgWidth) // set its dimentions
      .attr('height', svgHeight)
      .attr('class','graph');

     // define the y scale  (vertical)
        var yScale = d3.scale.linear()
	        .domain([0, 10])    // values between 0 and 100
		.range([svgHeight - padding*2, padding]);   // map these to the chart height, less padding.
                 //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.


        var xScale = d3.scale.linear()
	        .domain([0, 10])    // values between for month of january
		.range([padding, svgWidth - padding * 2]);   // map these the the chart width = total width minus padding at both sides


     //Create the Axis
     var xAxis = d3.svg.axis()
                        .scale(xScale);


    // define the y axis
        var yAxis = d3.svg.axis()
            .orient("left")
            .scale(yScale);

        // define the y axis
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(xScale);

        // draw y axis with labels and move in from the size by the amount of padding
        graphSVG.append("g")
            .attr("transform", "translate("+padding*2+",0)")
            .call(yAxis);

        // draw x axis with labels and move to the bottom of the chart area
        graphSVG.append("g")
            .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
            .attr("transform", "translate("+padding+"," + (svgHeight - padding*2) + ")")
            .call(xAxis);

        // now add titles to the axes
          graphSVG.append("text")
              .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
              .attr("transform", "translate("+ (padding/2) +","+(svgHeight/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
              .text("Effort")
              .attr("class","graph-text");

          graphSVG.append("text")
              .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
              .attr("transform", "translate("+ (svgWidth/2) +","+(svgHeight-(padding/3))+")")  // centre below axis
              .text("Salary")
              .attr("class","graph-text");

    return graphSVG;
}

function drawTrialsGraph(id, svgWidth, svgHeight) {
  var graphDIV = d3.select('#' + id)
  var padding = 20;

  var graphSVG=graphDIV.append('svg')        // create an <svg> element
      .attr('width', svgWidth) // set its dimentions
      .attr('height', svgHeight)
      .attr('class','graph');

     // define the y scale  (vertical)
        var yScale = d3.scale.linear()
	        .domain([0, 100])    // values between 0 and 100
		        .range([svgHeight - padding*2, padding]);   // map these to the chart height, less padding.
                 //REMEMBER: y axis range has the bigger number first because the y value of zero is at the top of chart and increases as you go down.


        var xScale = d3.scale.linear()
	        .domain([0, 10])    // values between for month of january
		        .range([padding, svgWidth - padding * 2]);   // map these the the chart width = total width minus padding at both sides


     //Create the Axis
     var xAxis = d3.svg.axis()
                        .scale(xScale);


    // define the y axis
        var yAxis = d3.svg.axis()
            .orient("left")
            .scale(yScale);

        // define the y axis
        var xAxis = d3.svg.axis()
            .orient("bottom")
            .scale(xScale);

        // draw y axis with labels and move in from the size by the amount of padding
        graphSVG.append("g")
            .attr("transform", "translate("+padding*2+",0)")
            .call(yAxis);

        // draw x axis with labels and move to the bottom of the chart area
        graphSVG.append("g")
            .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
            .attr("transform", "translate("+padding+"," + (svgHeight - padding*2) + ")")
            .call(xAxis);

        // now add titles to the axes
          graphSVG.append("text")
              .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
              .attr("transform", "translate("+ (padding/2) +","+(svgHeight/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
              .text("Values")
              .attr("class","graph-text");

          graphSVG.append("text")
              .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
              .attr("transform", "translate("+ (svgWidth/2) +","+(svgHeight-(padding/3))+")")  // centre below axis
              .text("Trials")
              .attr("class","graph-text");

    return graphSVG;
}

function drawIdentity(graphSVG, angle) {
  svgWidth = graphSVG.attr("width");
  svgHeight = graphSVG.attr("height");
  padding = 20;

  x1 = 2*padding;
  y1 = svgHeight - padding*2;

  x2 = svgWidth - padding;
  y2 = padding;

  if(angle<Math.PI/4) {
    y2 = y1 - Math.tan(angle)*(x2 - x1);
  }
  else if (angle>Math.PI/4) {
    x2 = x1 + (y1 - y2)/Math.tan(angle);
  }

  var line = graphSVG.select("line.identity");
  if(line.empty() == true)
  {
    line = graphSVG.append("line")
                  .attr("stroke-width",2)
                  .attr("class","identity")
                  .transition()
                  .duration(800);
  }

  line.attr("x1", x1)
  .attr("y1", y1)
  .attr("x2", x2)
  .attr("y2", y2)

  return graphSVG;
}

function drawIdeal(graphSVG, effort) {
  svgWidth = graphSVG.attr("width");
  svgHeight = graphSVG.attr("height");
  padding = 20;

  x1 = 2*padding;

  x2 = svgWidth - padding;

  //scale parameters
  effortScale = d3.scale.linear()
                  .domain([100, 0])
                  .range([padding, svgHeight - 2*padding]);

  y1 = y2 = effortScale(effort);

  var line = graphSVG.select("line.ideal");
  if(line.empty() == true)
  {
    line = graphSVG.append("line")
                  .attr("stroke-width",2)
                  .attr("class","ideal")
                  .transition()
                  .duration(800);
  }

  line.attr("x1", x1)
  .attr("y1", y1)
  .attr("x2", x2)
  .attr("y2", y2);

  return graphSVG;
}

function connectGraph2Output(graphSVG, chernoffSVG, recordSVG) {
    //Get coordinates of the point
    var svgWidth = graphSVG.attr('width');
    var svgHeight = graphSVG.attr('height');
    var padding = 20;

    var coordinates = [svgWidth - padding, svgHeight - padding*2];

    graphSVG.on("click",function(){

        coordinates = d3.mouse(this);
        var effort = coordinates[1];
        var salary = coordinates[0];

        if(effort < padding || effort >(svgHeight - padding*2) || salary<padding*2 || salary>(svgWidth - padding))
        {
          //area outside graph clicked.
          return;
        }

        circle = graphSVG.select('circle');
        if(circle.empty())
        {
          circle = drawCircle(graphSVG, 5, 5, salary, effort);
          circle.attr("class","mark");
        }
        else {
          moveCircle(circle,salary, effort);
        }

        updateOutput(graphSVG, chernoffSVG, recordSVG);
  });

}

function updateOutput (graphSVG, chernoffSVG, recordSVG) {
  //Calculate Effort
  var effort = readEffortFromGraph(graphSVG);

  //Calculate salary
  var salary = readSalaryFromGraph(graphSVG);

  //Read Identity
  var identity = readIdentityFromGraph(graphSVG);

  //Read ideal
  var ideal = readIdealFromGraph(graphSVG);

  var utility = getUtility(effort, salary, identity, ideal);

  if(chernoffSVG != null) {
    console.log("Update chernoff" + utility);
    drawSmile(chernoffSVG, utility);
  }

  if(recordSVG != null) {
      //Scale utility to 100 for graph
      var utilScale = d3.scale.linear().domain([-50,170]).range([0,100]);

      record(recordSVG, effort, salary, identity, ideal, utilScale(utility));
  }
}

function record (recordSVG, effort, salary, identity, ideal, utility) {

    //Draw line for effort
  drawMarkLine(recordSVG, effort, "effort");

  //Draw line for identity
  drawMarkLine(recordSVG, identity, "identity");

  //Draw line for ideal effort
  drawMarkLine(recordSVG, ideal, "ideal");

  //Draw line for salary
  drawMarkLine(recordSVG, salary, "salary");

  //drawMarkLine for utility
  drawMarkLine(recordSVG, utility,"utility");

}

function drawMarkLine(graphSVG, value, addClass) {
  //Get coordinates of the point
  var svgWidth = graphSVG.attr('width');
  var svgHeight = graphSVG.attr('height');
  var padding = 20;

  var yScale = d3.scale.linear()
                  .domain([100, 0])
                  .range([padding, svgHeight - 2*padding]);

  var allMarks = graphSVG.selectAll('circle.'+addClass);

  if(allMarks.size() >= 11) {
    return;
  }
  var x2 = 2*padding;
  var y2 = yScale(value);
  if(allMarks.empty() == false )
  {
    var lastMark = d3.select(allMarks[0][allMarks.size() - 1]);
    var x1 = Number(lastMark.attr('cx'));
    var y1 = Number(lastMark.attr('cy'));
    x2 = x1 + (svgWidth - 3*padding)/10;
    line = graphSVG.append("line")
                  .attr("stroke-width",2)
                  .attr("stroke", "blue")
                  .attr("class","mark-line "+addClass)
                  .transition()
                  .duration(800)
                  .attr('x1',x1)
                  .attr('y1',y1)
                  .attr('x2',x2)
                  .attr('y2',y2);
  }

  var mark = drawCircle(graphSVG, 5,5, x2, y2);
  mark.attr("class","mark "+addClass);
}


function clearTrials(recordSVGId) {
  var recordSVG = d3.select('#'+recordSVGId+" svg.graph");
  // console.log(recordSVG.selectAll("svg.graph"));
  recordSVG.selectAll('circle.mark').remove();
  recordSVG.selectAll('line').remove();
}

function readEffortFromGraph(graphSVG) {
  var svgWidth = graphSVG.attr('width');
  var svgHeight = graphSVG.attr('height');
  var padding = 20;

  //Return default if no element is present
  if(graphSVG.select("circle.mark").empty())
  {
    return 0;
  }
  var effort = graphSVG.select("circle.mark").attr("cy");
  //scale parameters
  effortScale = d3.scale.linear()
                  .range([100, 0])
                  .domain([padding, svgHeight - 2*padding]);

  return effortScale(effort);
}

function readSalaryFromGraph(graphSVG) {
  var svgWidth = graphSVG.attr('width');
  var svgHeight = graphSVG.attr('height');
  var padding = svgWidth*10/100;

  //Return default if no element is present
  if(graphSVG.select("circle.mark").empty())
  {
    return 0;
  }

  var salary = graphSVG.select("circle.mark").attr("cx");

  salaryScale = d3.scale.linear()
                  .range([0,100])
                  .domain([padding, svgWidth - padding]);

  return salaryScale(salary);
}

function readIdentityFromGraph(graphSVG) {
  var svgWidth = graphSVG.attr('width');
  var svgHeight = graphSVG.attr('height');
  var padding = 20;

  var identityScale = d3.scale.linear()
                  .range([0,100])
                  .domain([0,Math.PI/2]);
  var line = graphSVG.select("line.identity");

  //Return default if no element is present
  if(line.empty())
  {
    return Math.PI/4;
  }
  var angle = -1 * Math.atan2(line.attr("y2") - line.attr("y1"), line.attr("x2") - line.attr("x1"));

  return identityScale(angle);
}

function readIdealFromGraph(graphSVG) {
  var svgWidth = graphSVG.attr('width');
  var svgHeight = graphSVG.attr('height');
  var padding = svgWidth*10/100;

  //scale parameters
  effortScale = d3.scale.linear()
                  .range([100, 0])
                  .domain([padding, svgHeight - padding]);

  var line = graphSVG.select("line.ideal");

  //Return default if no element is present
  if(line.empty()) {
    return 0;
  }
  var effort = line.attr("y2");
  return effortScale(effort);
}

function changeIdentity(graphId, value, recordId) {
  var graphSVG = d3.select('#'+graphId+" svg.graph");
  var chernoffSVG = d3.select('#'+graphId+" svg.chernoffFace");
  var recordSVG = (recordId == null)? null:d3.select('#'+recordId+" svg.graph");

  var angleScale = d3.scale.linear()
                  .range([0,Math.PI/2])
                  .domain([100,0]);
  drawIdentity(graphSVG, angleScale(value));

  updateOutput(graphSVG, chernoffSVG, recordSVG);
}

function changeIdeal(graphId, value, recordId) {
  var graphSVG = d3.select('#'+graphId+" svg.graph");
  var chernoffSVG = d3.select('#'+graphId+" svg.chernoffFace");
  var recordSVG = (recordId == null)? null:d3.select('#'+recordId+" svg.graph");

  drawIdeal(graphSVG, value);

  updateOutput(graphSVG, chernoffSVG, recordSVG);


}
