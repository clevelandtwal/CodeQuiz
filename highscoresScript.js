const newScore = $("#new-score");

// On submit of form render users initials with score beneath "Top Scores"  TW - 22
//     Re render start game button
//     Render a clear scores button


// Render High Scores
const storedScore = localStorage.getItem("score");
newScore.text(storedScore);

