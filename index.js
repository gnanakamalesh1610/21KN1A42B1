const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const windowSize = 10;
var stored = [];

app.get("/number/:numberId", async (req, res) => {
  const id = req.params.numberId;

  try {
    const numbers = await fetchNumbers(id);
    const uniqueNumbers = [...new Set(numbers)];
    let currentStored = uniqueNumbers.slice(-windowSize);

    if (stored.length > windowSize) {
      stored = stored.slice(-windowSize);
    }

    const avg =
      uniqueNumbers.reduce((acc, curr) => acc + curr, 0) / uniqueNumbers.length;
    console.log(avg);

    const response = {
      windowPrevState: stored,
      currentState: currentStored,
      numbers: uniqueNumbers,
      avg: avg,
    };

    stored = [...uniqueNumbers];

    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).send("something went wrong");
  }
});

const fetchNumbers = (id) => {
  if (id == "e") {
    return [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
  } else if (id == "p") {
    return [2, 3, 5, 7, 11];
  } else if (id == "f") {
    return [1, 2, 3, 5, 8, 13];
  }
};

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
