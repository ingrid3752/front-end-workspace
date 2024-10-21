<!--
const a:string = "hello";
let b:number = 3;
const c:any = true;
let d:unknown;

b + c;

if(typeof d === "number") {
    b + d;
}
-->
<!--
const nums:readonly number[] = [1, 2, 3];
nums.push(4);
 -->
<!--
const add = (a:number, b:number) => {
    return a + b;
}
            파라미터 타입        리턴 타입
const add = (a:string, b:string):string => {
    return a + b;
}
type을 명시하여 함수 타입으로 사용
type Add = (a:number, b:number) => number;

const add:Add = (a, b) => {
    return a + b;
}

type Add = (a:number, b:number, c?:number) => number;


const add:Add = (a, b, c) => {
    return c !== undefined ? a + b + c : a + b;
}

console.log(add(1, 2));
console.log(add(3, 4, 5));

type GetItem = <T>(arr:T[], index:number) => T;

const getItem:GetItem = (arr, index) => {
    return arr[index];
}

getItem([1, 2, 3], 0);
getItem(["1", "2", "3"], 0);

interface Person {
    name: string,
    age?: number
};

interface Developer extends Person {
    skills: string[]
}

const test:Person = {
    name: "test",
    age: 10
}

const test2:Developer = {
    name: "test2",
    skills: ["Spring", "React"]
}

class Person {
    public name: string;
    protected age: number;
    private skill: string[];

    constructor(name: string, age: number, skill:string[]) {
        this.name = name;
        this.age = age;
        this.skill = skill;
    }
    getAge() {
        return this.age;
    }

    getSkill() {
        return this.skill;
    }
};

class Developer extends Person {
    getAge() {
        return this.age;
    }
    getSkill() {
        return this.skill;
    }
}

const test = new Person("test", 15, ['java', 'javascript']);
console.log(test.name);
console.log(test.getAge());
console.log(test.getSkill());

npx create-react-app project1 --template typescript
.ts
.tsx -> 리액트에서 사용하는 타입스트립트 파일 확장자

App.tsx
index.tsx

npm i 오류시
--force

npx tsc --init
 -->
