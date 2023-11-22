interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// utility type: 기존에 있던 하나의 타입을 가지고 추가하거나 제거하여 새로운 타입을 만든 타입.

// 1. Partial type : 모든 타입에 ?를 붙여 있어도 되고 없어도 되는 타입으로 변경
type aaa = Partial<IProfile>;

// 2. Required type : 모든 타입의 ?를 제거하여 무조건 있어야 하는 타입으로 변경
type bbb = Required<IProfile>;

// 3. Pick type : 기존 타입 중 필요한 것만 골라옴
type ccc = Pick<IProfile, "name" | "age">; // name과 age만 빼서 ccc라는 타입을 새로 만듬.

// 4. Omit type : 기존 타입 중 필요 없는걸 제거
type ddd = Omit<IProfile, "school">; // school 만 제거하여 ddd라는 타입을 새로 만듬.

// 5. Record type :
type eee = "철수" | "영희" | "훈이"; // Union 타입 ==> 합친다.
let child1: eee = "영희"; // 철수, 영희, 훈이만 됨. string 타입의 범위를 좁힘. ==> typescript의 안정성을 위함.
let child2: string = "사과"; // 철수, 영희, 훈이, 사과, 바나나 다 됨

type fff = Record<eee, number>; // eee 타입을 key로 가져오고, 그 key들의 type을 number로 바꿈

// 6. 객체의 key 들로 Union type 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
let myprofile: ggg = "hobby";

// 7. type vs interface 차이      => interface는 "선언 병합" 가능. 같은 이름으로 interface를 하나 더 만들면 기존 interface와 합쳐짐.
interface IProfile {
  candy: number;
}

// 8. 배운것 응용
let profile: Partial<IProfile> = {
  candy: 10,
};
