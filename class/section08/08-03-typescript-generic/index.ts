// 1. 문자/숫자/불린 기본타입(primitive type)
const getPrimitive = (arg1: string, arg2: number, arg3: boolean): [boolean, number, string] => {
  return [arg3, arg2, arg1];
};

const result = getPrimitive("철수", 123, true);

//
//
// 2. Any 타입(그냥 자바스크립트랑 같음)
const getAny = (arg1: any, arg2: any, arg3: any): [any, any, any] => {
  console.log(arg1 + 100); // any는 아무거나 다 됨!
  return [arg3, arg2, arg1];
};

const result1 = getAny("철수", 123, true);

//
//
// 3. Unknown 타입
const getUnknown = (arg1: unknown, arg2: unknown, arg3: unknown): [unknown, unknown, unknown] => {
  if (typeof arg1 === "number") console.log(arg1 + 100); // any는 아무거나 다 됨!
  return [arg3, arg2, arg1];
};

const result2 = getUnknown("철수", 123, true);

//
//
// 4. Generic 타입
function getGeneric<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result3 = getGeneric("철수", 123, true);

//
//
// 4-1. Generic 타입 - 미리 명시
function getGeneric1<MyType1, MyType2, MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
  return [arg3, arg2, arg1];
}

const result4 = getGeneric1<string, number, boolean>("철수", 123, true); // 함수 호출 시 Generic으로 미리 타입을 명시할 수 있음.

//
//
// 4-2. Generic 타입 - 2
function getGeneric2<T1, T2, T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
  return [arg3, arg2, arg1];
}

const result5 = getGeneric2("철수", 123, true);

//
//
// 4-3. Generic 타입 - 3
function getGeneric3<T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
  return [arg3, arg2, arg1];
}

const result6 = getGeneric3("철수", 123, true);

//
//
// 4-4. Generic 타입 - 4 화살표 함수
const getGeneric4 = <T, U, V>(arg1: T, arg2: U, arg3: V): [V, U, T] => {
  return [arg3, arg2, arg1];
};

const result7 = getGeneric4("철수", 123, true);

/*
 Any와 Generic의 차이 !!
   - Any는 argument를 넣을 때 아무거나 넣어도 되지만, Return type을 알 수 없다.
   - 하지만, Generic은 argument를 넣을 때 아무거나 넣어도 되지만 처음 들어오는 argument에 따라 return type이 정해져서 유추 가능.
*/
