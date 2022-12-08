"use strict";
/**
 * O Contexto define a interface de interesse dos clientes. Também mantém um
 * referência a uma instância de uma subclasse State, que representa o atual
 * estado do Contexto.
 */
class Context {
    constructor(state) {
        this.transitionTo(state);
    }
    /**
     * O Context permite alterar o objeto State em tempo de execução.
     */
    transitionTo(state) {
        console.log(`Context: Transição para
        ${state.constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }
    /**
     * O Context delega parte de seu comportamento ao objeto State atual.
     */
    request1() {
        this.state.handle1();
    }
    request2() {
        this.state.handle2();
    }
}
/**
 * A classe base State declara métodos que todo Concrete State deve
 * implementa e também fornece uma referência anterior ao objeto Context, associado
 * com o Estado. Esta referência anterior pode ser usada pelos Estados para fazer a transição do
 * Contexto para outro Estado.
 */
class State {
    setContext(context) {
        this.context = context;
    }
}
/**
 * Estados concretos implementam vários comportamentos, associados a um estado do
 * Contexto.
 */
class ConcreteStateA extends State {
    handle1() {
        console.log("ConcreteStateA trata da requisição1.");
        console.log("ConcreteStateA quer mudar o estado do contexto.");
        this.context.transitionTo(new ConcreteStateB());
    }
    handle2() {
        console.log("ConcreteStateA trata da requisição2.");
    }
}
class ConcreteStateB extends State {
    handle1() {
        console.log("ConcreteStateB trata da requisição1.");
    }
    handle2() {
        console.log("ConcreteStateB trata da requisição2.");
        console.log("ConcreteStateB quer mudar o estado do contexto.");
        this.context.transitionTo(new ConcreteStateA());
    }
}
/**
 * O código do cliente.
 */
const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
