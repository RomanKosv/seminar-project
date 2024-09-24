'use strict';
//тригонометрическая форма
class ComplexTF {
    //конструктор
    constructor (module,argument,dec) {
        this.module=module;
        this.argument=argument;
        this.dec=dec;
        this.PI=dec.acos(-1);
    }
    //берет корень натуральной степени pow
    roots(pow){
        if ((pow<=0) || (pow%1!=0)) {
            throw Error(`Pow ({pow}) is not natural`)
        }
        let roots=[];
        let rootLen=this.module.pow(1/pow);
        let baseArg=this.argument.div(pow);
        //console.log(this);
        console.log(this.dec.PI);
        let tau=this.PI.mul(2);
        let dAngle=tau.div(pow);
        for(let rootN=0;rootN<pow;rootN++) {
            console.log('root');
            roots.push(new ComplexTF(rootLen,baseArg.add(dAngle.mul(rootN)),this.dec));
        }
        //console.log(roots.map((a)=>a.toString()));
        return roots;
    }
    //переводит в нормальную форму(ComplexNF)
    normalForm() {
        return new ComplexNF(
            this.dec.cos(this.argument).mul(this.module),
            this.dec.sin(this.argument).mul(this.module),
            this.dec
        );
    }

    toString() {
        return this.module.toFixed()+"*(cos("+this.argument.toFixed()+")+i*sin("+this.argument.toFixed()+"))"
    }

}
//нормальнуая форма
class ComplexNF {
    //конструктор
    constructor (real,irrational,dec) {
        this.real=real;
        this.imagine=irrational;
        this.dec=dec;
    }
    //переводит в тригонометрическую форму(ComplexTF)
    trigonometryForm() {
        return new ComplexTF(
            (this.real.pow(2).plus(this.imagine.pow(2))).pow(0.5),
            this.dec.atan2(this.imagine,this.real),
            this.dec
        );
    }
    //отвечает за вывод в строку
    toString() {
        if(this.imagine.isNegative()){
            return this.real.toFixed()+this.imagine.toFixed()+'i'
        }
        return this.real.toFixed()+'+'+this.imagine.toFixed()+'i'
    }

    static catchRE=/^(?<real>(?:\+|-)?\d+(?:\.\d+)?)(?:(?<imagine>(?:\+|-)\d+(?:\.\d+)?)i)$/;

    //вспомогательный метод
    static catchStr(str) {
        console.log(str.replace(' ','').match(ComplexNF.catchRE));
        console.log(str.replace(' ','').match(ComplexNF.catchRE).groups);
        return str.replace(' ','').match(ComplexNF.catchRE).groups;
    }
    //из строки в число
    static fromString(str,dec=Decimal) {
        let {real,imagine}=ComplexNF.catchStr(str);
        let num1=new dec(real);
        let num2=new dec(imagine);
        return new ComplexNF(num1,num2,dec);
    }
    static match(str){
        return (ComplexNF.catchRE).test(str.replace(' ',''))
    }
    //берет корень натуральной степени pow
    roots(pow) {
        console.log(this);
        return this.trigonometryForm().roots(pow).map(
            (tf)=>tf.normalForm()
        );
    }
    //отвечает за вывод в строку с заданной точностью
    toFixed(n) {
        if(this.imagine.isNegative()){
            return this.real.toFixed(n)+this.imagine.toFixed(n)+'i'
        }
        return this.real.toFixed(n)+'+'+this.imagine.toFixed(n)+'i'
    }

}

