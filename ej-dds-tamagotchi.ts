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

    contador = 0;
    jugar(mascota: Tamagotchi) {
        this.contador += 1;
        if (this.contador >= 5) {
            mascota.setEstado(new Hambrienta());
        } else {
            this.nivelDeContenta += 2;
        }
    }

}

class Hambrienta implements IEstado {

    comer(mascota: Tamagotchi) {
        mascota.setEstado(new Contenta(0));
    }

    jugar(mascota: Tamagotchi) {
        mascota.setEstado(new Mal_humor(0));
    }

}

class Mal_humor implements IEstado {

    constructor(tiempoDeMalHumor: number) {
        this.tiempoDeMalHumor = tiempoDeMalHumor;
    }

    comer(mascota: Tamagotchi) {

    }

    jugar(mascota: Tamagotchi) {
        mascota.setEstado(new Contenta(0));
    }

}