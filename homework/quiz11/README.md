# 1. 타입스크립트 단답형 퀴즈

## 1-1) 타입 지정하기

1. 각각의 상수에 아래 예시처럼 적절한 타입을 명시해 주세요.

   예) const appleCount: number = 13

1. const myname: \\\\ = “철수” <!-- string -->
1. const breadCount: \\\\ = 2 <!-- number -->
1. const isActive: \\\\ = false <!-- boolean -->

## 1-2) 배열형 타입 지정하기

1. 아래 배열 상수가 선언되어 있습니다. 각각의 배열 상수에 적절한 타입을 명시해 주세요.

   예) const ages: number[] = [13, 8, 12, 16]

1. const classmates: \\\\ = [“철수”, “영희”, “훈이”] <!-- string[] -->
1. const candyCounts: \\\\ = [2, 6, 4] <!-- number[] -->
1. const moneyList: \\\\ = [1000, 2500, 4300] 또는 [”1000원”, “2500원”, “4300원”] <!-- (number | string)[] -->
1. const isActiveList: \\\\ = [true, false, “false”, “true”, false] <!-- (boolean | string)[] -->

## 1-3) 객체형 타입 지정하기

1.  아래 객체 상수가 선언되어 있습니다. 각각의 객체 상수에 적절한 타입을 명시해 주세요.

    예) 아래 profiles에 들어갈 적절한 타입을 만들고 적용해 주세요.

         interface IProfile {
              name: string
              age: number
              school: string
         }

         const profiles: IProfile = {
              name: “철수”,
              age: 13,
              school: “다람쥐초등학교”
         }

    1. 아래 createBoardInput에 들어갈 적절한 타입을 만들고 적용해 주세요.

    interface \\\\ { <!-- ICreateBoardInput -->
    // 이 부분도 완성해 주세요.
    <!--
        writer: string
        title: string
        contents: string
        -->

    }

    const createBoardInput: \\\\ = { <!-- ICreateBoardInput -->
    writer: “영희”,
    title: “좋은 날씨 입니다~”,
    contents: “오늘은 특히 더 날씨가 좋네요^^”
    }

    2. 아래 updateBoardInput1, updateBoardInput2에 공통으로 들어갈 적절한 타입을 만들고 적용해 주세요.

    interface \\\\ { <!-- IUpdateBoardInput -->
    // 이 부분도 완성해 주세요.
    <!--
         writer: string
         title?: string
         contents: string
         -->

    }

    const updateBoardInput1: \\\\ = { <!-- IUpdateBoardInput -->
    writer: “영희”,
    title: “좋은 날씨 입니다~”,
    contents: “오늘은 특히 더 날씨가 좋네요^^”
    }

    const updateBoardInput2: \\\\ = { <!-- IUpdateBoardInput -->
    writer: “훈이”,
    contents: “기존에 작성한 글 내용 일부가 수정됐네요”
    }

# 2. DI / IOC 단답형 퀴즈

## 2-1) 아래 DI 퀴즈를 풀어주세요.

1. DI는 무엇의 약자인가요?

   정답 > <!-- Dependency Injection -->

2. DI 이면 싱글톤 패턴인가요?

   정답 > <!-- No -->

3. IOC는 무엇의 약자인가요?

   정답 > <!-- Inversion Of Control -->

4. Nest.js에서 IOC 컨테이너가 DI를 해주고 있나요?

   정답 > <!-- Yes -->

5. javascript 언어로 사용 가능한 Backend 프레임워크에 Nest.js 가 있습니다.

   java 언어로 사용 가능한 Backend 프레임워크에는 Spring 이 있습니다.

   이 둘 모두 해당 프레임워크들에 IOC 컨테이너가 존재하며, DI를 지원하고 있나요?

   정답 > <!-- Yes -->
