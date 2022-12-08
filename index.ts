/**
 * O Contexto define a interface de interesse dos clientes. Também mantém um
 * referência a uma instância de uma subclasse State, que representa o atual
 * estado do Contexto.
 */

class Context {
  /**
   * @type {State} Uma referência ao estado atual do Context.
   */
  private state!: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  /**
   * O Context permite alterar o objeto State em tempo de execução.
   */
  public transitionTo(state: State): void {
    console.log(`Context: Transição para
        ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  /**
   * O Context delega parte de seu comportamento ao objeto State atual.
   */
  public request1(): void {
    this.state.handle1();
  }

  public request2(): void {
    this.state.handle2();
  }
}

/**
 * A classe base State declara métodos que todo Concrete State deve
 * implementa e também fornece uma referência anterior ao objeto Context, associado
 * com o Estado. Esta referência anterior pode ser usada pelos Estados para fazer a transição do
 * Contexto para outro Estado.
 */
abstract class State {
  protected context!: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle1(): void;

  public abstract handle2(): void;
}

/**
 * Estados concretos implementam vários comportamentos, associados a um estado do
 * Contexto.
 */
class ConcreteStateA extends State {
  public handle1(): void {
    console.log("ConcreteStateA trata da requisição1.");
    console.log("ConcreteStateA quer mudar o estado do contexto.");
    this.context.transitionTo(new ConcreteStateB());
  }

  public handle2(): void {
    console.log("ConcreteStateA trata da requisição2.");
  }
}

class ConcreteStateB extends State {
  public handle1(): void {
    console.log("ConcreteStateB trata da requisição1.");
  }

  public handle2(): void {
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
