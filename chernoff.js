var chernoffMouthRange={min:-5, max:5 }
var mouthDomain={min:0, max:100}
var duration=800;
var chernoffMouthScale=d3.scale.linear()
                            .domain([mouthDomain.min, mouthDomain.max])
                            .range([chernoffMouthRange.min, chernoffMouthRange.max]);

function createFace(id, svgWidth, svgHeight)
{
  var chernoffFaceDIV = d3.select('#' + id);



  var chernoffFaceSVG=chernoffFaceDIV.append('svg')        // create an <svg> element
      .attr('width', svgWidth) // set its dimentions
      .attr('height', svgHeight)
      .attr("class","chernoffFace");
      drawFace(chernoffFaceSVG, svgWidth, svgHeight, svgWidth/2, svgHeight/2, mouthDomain.max)
      return chernoffFaceSVG;
}


function drawFace(chernoffFaceSVG, svgWidth, svgHeight, x, y, value) {

  var cuteQuotientH =  svgHeight/8;
  var cuteQuotientW =  svgWidth/8;

  //Draw circle for face
  var face= drawCircle(chernoffFaceSVG, svgWidth, svgHeight, x, y);
  face.attr("class","face");

  //Draw circle for left eye
  var leftEye = drawCircle(chernoffFaceSVG, svgWidth/4, svgHeight/4, x/2, y/2);
  leftEye = moveCircle(leftEye, x/2 + cuteQuotientW , y);
  leftEye.attr("class", "eye");

  var rightEye = drawCircle(chernoffFaceSVG, svgWidth/4, svgHeight/4, x/2, y/2);
  rightEye = moveCircle(rightEye, 3*x/2 - cuteQuotientW, y);
  rightEye.attr("class", "eye");

  var mouth = drawSmile(chernoffFaceSVG,value);
}

function drawCircle(chernoffFaceHolder, svgWidth, svgHeight, x, y) {
  var circle=chernoffFaceHolder.append('circle')
                        .attr('cx',x)
                         .attr('cy',y)
                         .attr('r',function(d){
                             return svgWidth*0.8/2;
                         })
  return circle;
}

function moveCircle(circle, cx, cy) {
  circle.attr('cx',cx)
  .attr('cy',cy);
  return circle;
}

function changeSmile(chernoffFaceHolderId, value) {
  chernoffFaceHolder = d3.select('#'+chernoffFaceHolderId+" svg");
  drawSmile(chernoffFaceHolder, value);
}

function drawSmile(chernoffFaceHolder, value)
{
  var svgHeight = chernoffFaceHolder.attr("height");
  var svgWidth = chernoffFaceHolder.attr("width");

  var chernoffMouthScale=d3.scale.linear()
                              .domain([mouthDomain.min, mouthDomain.max])
                              .range([-svgHeight/8, svgHeight/8]);

  var cuteQuotientW = svgWidth/8;
  var cuteQuotientH = chernoffMouthScale(value)/2;

  var smileOffset = chernoffMouthScale(value);

  var mouth = chernoffFaceHolder.select("path."+"mouth");

  //Create a mouth if no mouth exists
  if(mouth.empty()) {
    mouth = chernoffFaceHolder.append('path')
                           .attr("class","mouth")
  }

   mouth.transition()
   .duration(duration)
   .attr('d',getMouthConfig(svgWidth, cuteQuotientW, svgHeight, cuteQuotientH, smileOffset))
}

function getMouthConfig(svgWidth, cuteQuotientW, svgHeight, cuteQuotientH, smileOffset) {

      start="M "
      Ay=3*svgHeight/4 - cuteQuotientH;
      Ax=svgWidth/4 + cuteQuotientW;
      Cy=3*svgHeight/4 - cuteQuotientH;
      Cx=3*svgWidth/4 - cuteQuotientW;

      By=3*svgHeight/4 + smileOffset;
      Bx=svgWidth/2;

      d=start+Ax+' '+Ay+' Q '+Bx+' '+By+' '+Cx+' '+Cy+' '
      return d;
}
