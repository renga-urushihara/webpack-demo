import { calc } from "@/hoge/util";

function getName(id?: string): string {
    return id ? id : "undefined";
}

const user: { name: string, age: number} = {
    name: "hoge",
    age: 2
};

const a: string = getName(user.name);
console.log(a);
console.log(calc(3));