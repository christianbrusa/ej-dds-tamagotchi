class Tamagotchi {

    constructor(private estado: IEstado) {
    }

    setEstado(estado: IEstado) {
        this.estado = estado;
    }

    comer() {
        this.estado.comer(this);
    }

    puedeJugar() {
        this.estado.puedeJugar(this);
    }

    jugar() {
        this.estado.jugar(this);
    }

}

interface IEstado {

    comer(mascota: Tamagotchi): void
    puedeJugar(mascota: Tamagotchi): void
    jugar(mascota: Tamagotchi): void

}

class Contenta implements IEstado {

    constructor(nivelDeContenta: number) {
        this.nivelDeContenta = nivelDeContenta;
    }

    comer(mascota: Tamagotchi) {
        this.nivelDeContenta += 1;
    }

    jugar(mascota: Tamagotchi) {

    }

}

class Hambrienta implements IEstado {

    comer(mascota: Tamagotchi) {
        mascota.setEstado(new Contenta(0));
    }

    jugar(mascota: Tamagotchi) {

    }

}