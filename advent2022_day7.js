const puzzleInput = ``;
const testInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

// helper function to find numbers
function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const buildFileStructure = (input) => {
  const outputLines = input.split("\n");
  const fileStructure = { home: {} };
  const depthTracker = [];
  let currentDir = "home";
  outputLines.forEach((line) => {
    const lineSplit = line.split(" ");
    // console.log(line);
    if (lineSplit[0] === "$") {
      const lineSplit = line.split(" ");
      const command = lineSplit[1];
      const input = lineSplit[2];

      switch (command) {
        case "cd":
          if (input === "..") {
            currentDir = depthTracker[depthTracker.length - 1];
            depthTracker.splice(depthTracker.length - 1, 1);
          } else {
            depthTracker.push(currentDir);
            currentDir = input;
            fileStructure[currentDir] = {};
          }
        case "ls":
          // idk - i don't think I actually need to do anything with this.
          break;
      }
    } else if (isNumeric(lineSplit[0])) {
      fileStructure[currentDir]["size"] = fileStructure[currentDir]["size"]
        ? (fileStructure[currentDir]["size"] += parseInt(lineSplit[0], 10))
        : parseInt(lineSplit[0], 10);

      depthTracker.forEach((prevDir) => {
        fileStructure[prevDir]["size"] = fileStructure[prevDir]["size"]
          ? (fileStructure[prevDir]["size"] += parseInt(lineSplit[0], 10))
          : parseInt(lineSplit[0], 10);
      });
    }
  });
  console.log(fileStructure);
  return fileStructure;
};

buildFileStructure(testInput);
