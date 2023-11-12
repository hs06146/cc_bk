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
const monster1 = new Monster(20);
monster1.attack();
monster1.run();

const monster2 = new Monster(50);
monster2.attack();
monster2.run();
