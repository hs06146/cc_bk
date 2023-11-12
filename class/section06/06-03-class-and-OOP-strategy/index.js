class 공중부품 {
  run = () => {
    console.log("날라서 도망가자!!");
  };
}

class 지상부품 {
  run = () => {
    console.log("뛰어서 도망가자!!");
  };
}

class Monster {
  power = 10;
  부품;

  // 생성자
  constructor(qqq) {
    this.부품 = qqq;
  }

  attack = () => {
    console.log("공격하자!");
    console.log(`내 공격력은 ${this.power}야!!!`);
  };

  run = () => {
    this.부품.run();
  };
}

const monster1 = new Monster(new 공중부품());
monster1.attack();
monster1.run();

const monster2 = new Monster(new 지상부품());
monster2.attack();
monster2.run();
