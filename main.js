

let state={
    value:'',
    result:'',
    comment1:'',
    comment2:'',
    comment3:'',
    eval_f:realSqrt,
    accuracy:10,
    functions:[realSqrt,complexSqrt],
    dec:Decimal,
}
let localization={
    complex_not_parse_c2:"комплексное число должно иметь форму a+bi, измените ввод",
    rational_not_parse_c2:"введено не число, измените ввод",
    rational_less_than_0_c2:"число должно быть < 0, измените ввод или перейдите к комплексным числам",
    accuracy_not_integer:"точность - натуральное число, измените ввод. Текущая точность: "
}
function setById(_id,_html){
    document.getElementById(_id).innerHTML=_html
}
function render(){
    setById("result",state.result);
    setById("c1",state.comment1);
    setById("c2",state.comment2);
    setById("c3",state.comment3);
    console.log('render')
}
function onEval(val) {
    state.dec=Decimal.set({
        precision:(state.value.length+state.accuracy+10)*2
    });
    console.log("eval");
    state.eval_f();
    render();
}
function onInput(val) {
    console.log(val);
    state.value=val;
    console.log(val.length,state.accuracy)
}
function onSelect(ind){
    console.log('select');
    state.eval_f=state.functions[ind];
}
function onSelectAccuracy(obj){
    let val=obj.value
    console.log(val);
    if((! Number.isInteger(Number.parseFloat(val))) || val<=0){
        alert(localization.accuracy_not_integer+state.accuracy);
        state.comment1=localization.accuracy_not_integer+state.accuracy;
    }else{
        state.accuracy=Number.parseFloat(val);
        state.comment1="";
    };
    render()
}
//принимает строку формата a+bi и количество знаков после запятой
//возвращает список из 2 строк -- комплексные корни с заданной точностью в формате a+ib
function complexSqrt() {
    let text=state.value;
    let accuracy=state.accuracy;
    if(! (ComplexNF.match(text))){
        state.comment2=localization.complex_not_parse_c2;
        alert(localization.complex_not_parse_c2);
        return
    }
    state.comment2=""
    state.result=ComplexNF.fromString(text,state.dec)
        .roots(2)
        .map(
            (complex)=>complex.toFixed(state.accuracy)
        );
    console.log(typeof(state.result));
    console.log(state.result);
}
function realSqrt() {
    console.log(state.value);
    let num=new state.dec(NaN);
    try{
        num=new state.dec(state.value);
    }catch(e){
        console.log(e);
    }
    if (! num.isFinite()){
        state.comment2=localization.rational_not_parse_c2;
        alert(localization.rational_not_parse_c2);
        return
    }
    if(num.isNegative()){
        state.comment2=localization.rational_less_than_0_c2;
        alert(localization.rational_less_than_0_c2);
        return
    }
    state.result=num.pow(0.5).toFixed(state.accuracy);
    state.comment2="";
}
