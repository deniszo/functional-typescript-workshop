// not production ready IO
const IO = effect => ({
  usafeRun() {
    effect();
  }
});

// it's just an object and for the same effect it always returns the same object
const possiblyThrowingIO = IO(() => {
  if (Math.random() > 0.3) throw Error("I'm a side effeeeect!");
});

// somewhere in the program
possiblyThrowingIO.usafeRun();
