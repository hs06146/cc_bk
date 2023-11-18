// // public, private, protected, readonly

// class Monster2 {
//   // power = 10;                    ===> public, private, protected, readonly 중 1개라도 있으면 생략 가능

//   // 생성자
//   constructor(private power: any) {
//     //this.power = power;           ===> public, private, protected, readonly 중 1개라도 있으면 생략 가능
//   }

//   attack1 = () => {
//     console.log("공격하자!");
//     console.log(`내 공격력은 ${this.power}야!!!`); // 안에서 접근 가능
//     this.power = 30; // 안에서 수정 가능
//   };
// }

// class Fly2 extends Monster2 {
//   attack2 = () => {
//     console.log("공격하자!");
//     console.log(`내 공격력은 ${this.power}야!!!`); // 자식이 접근 불가
//     this.power = 30; // 자식이 수정 불가
//   };
// }

// const monster22 = new Fly2(20);
// monster22.attack1();
// monster22.attack2();
// console.log(monster22.power); // 밖에서 접근 불가
// monster22.power = 10; // 밖에서 수정 불가
