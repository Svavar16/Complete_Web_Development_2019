
$("h1").text("Bye");

$("button").html("<em></em>");

$("a").attr("href", "https:www.yahoo.com");

$("h1").click(function(){
  $("h1").css("color", "purple");
});

$("button").click(function(){
  $("h1").css("color", "purple");
});

$("h1").on("mouseover", function (){
  $("h1").css("color", "purple");
});
