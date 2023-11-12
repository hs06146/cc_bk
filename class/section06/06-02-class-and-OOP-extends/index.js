// class Date{
//     qqq = 3
//     getFullYear(){

//     }

//     getMonth(){

//     }
// }

const date = new Date();
console.log(date.getFullYear());
console.log(date.getMonth() + 1);

class Monster {
  power = 10;

  // 생성자
  constructor(qqq) {
    this.power = qqq;
  }

  attack = () => {
    console.log("공격하자!");
    console.log(`내 공격력은 ${this.power}야!!!`);
  };

  run = () => {
    console.log("도망가자!");
  };
}

class Fly extends Monster {
  constructor(aaa) {
    super(aaa); // 부모에게 인자 전달, 부모(Monster)의  constructor에 들어감.
  }

  // 부모 Class에 있는 함수와 동일한 이름의 함수를 만들면 덮어쓰기의 개념이 됨. ==> Overriding
  run = () => {
    console.log("날라서 도망가자!");
  };
}

class Ground extends Monster {
  constructor(bbb) {
    super(bbb);
  }

  run = () => {
    console.log("뛰어서 도망가자!");
  };
}

const monster1 = new Monster(20);
monster1.attack();
monster1.run();

const monster2 = new Monster(50);
monster2.attack();
monster2.run();

const flyingMonster = new Fly(15);
flyingMonster.attack();
flyingMonster.run();

const groundMonster = new Ground(25);
groundMonster.attack();
groundMonster.run();
