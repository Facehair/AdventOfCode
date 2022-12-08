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

const buildFileStructure = (input) => {
  const outputLines = input.split("\n");
  const fileStructure = { home: {} };
  const depthTracker = [];
  let currentDir = "home";
  outputLines.forEach((line) => {
    const isCommand = line[0] === "$";
    // console.log(line);
    if (isCommand) {
      const lineSplit = line.split(" ");
      const command = lineSplit[1];
      const input = lineSplit[2];

      switch (command) {
        case "cd":
          console.log(line);
          if (input === "..") {
            currentDir = depthTracker[depthTracker.length - 1];
            depthTracker.splice(depthTracker.length - 1, 1);
          } else {
            depthTracker.push(currentDir);
            currentDir = input;
          }
        case "ls":
          fileStructure[]
      }
    }
  });
  return fileStructure;
};

buildFileStructure(testInput);
