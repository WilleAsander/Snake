
function rektangel(ctx, x, y, width, height, color) 
{
   ctx.fillStyle = color;
   ctx.fillRect(x, y, width, height);
   
}

function cirkel(ctx, x, y, r, color, lineWidth, lineColor) 
{
   ctx.beginPath();
   ctx.fillStyle = color;
   ctx.arc(x, y, r, 0, Math.PI*2, true);
   ctx.fill();
   ctx.lineWidth = lineWidth;
   ctx.strokeStyle = lineColor;
   ctx.stroke();
   ctx.closePath(); 
}

function triangel(ctx, x1, y1, x2, y2, x3, y3, color) 
{
   ctx.beginPath();
   ctx.fillStyle = color;
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2, y2);
   ctx.lineTo(x3, y3);
   ctx.fill();
   ctx.closePath();
}

function linje(ctx, x1, y1, x2, y2, width, color)
{
   ctx.beginPath();
   ctx.strokeStyle = color;
   ctx.lineWidth = width;
   ctx.moveTo(x1, y1);
   ctx.lineTo(x2, y2);
   ctx.stroke();
   ctx.closePath();
}

function writeText(ctx, x, y, color, size, text)
{
ctx.fillStyle = color;
ctx.font = 'bold ' + size + "px Arial";
ctx.textBaseline = 'top';
ctx.fillText(text, x, y);
} 