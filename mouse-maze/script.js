$(function() {

    let gameStarted = false;

    $(".boundary").mouseover(gameOver);

    $("#maze").mouseleave(gameOver);

    $("#start").click(function() {
        gameStarted = true;
        $(".boundary").removeClass("youlose");
        $("#status").text("Game started!")
    });

    $("#end").mouseenter(gameWin);

    function gameOver() {
        if (gameStarted) {
            $(".boundary").addClass("youlose");
            $("#status").text("You Lost :(");
            gameStarted = false;
        }
    }

    function gameWin() {
        if (gameStarted) {
            $("#status").text("You win! :)");
            gameStarted = false;
        }
    }
});