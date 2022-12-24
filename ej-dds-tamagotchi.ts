const moment = require('moment');

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
        return this.estado.puedeJugar(this);
    }

    jugar() {
        this.estado.jugar(this);
    }

}

interface IEstado {

    comer(mascota: Tamagotchi): void
    puedeJugar(mascota: Tamagotchi): Boolean
    jugar(mascota: Tamagotchi): void

}

class Contenta implements IEstado {

    constructor(nivel: Number) {
        this.nivel = nivel;
        this.vecesJugadas = 0;
    }

    comer(mascota: Tamagotchi) {
        this.nivel += 1;
    }

    puedeJugar(mascota: Tamagotchi){
        return true;
    }

    jugar(mascota: Tamagotchi) {
        this.vecesJugadas += 1;
        if (this.vecesJugadas >= 5) {
            mascota.setEstado(new Hambrienta());
        } else {
            this.nivel += 2;
        }
    }

}

class Hambrienta implements IEstado {

    comer(mascota: Tamagotchi) {
        mascota.setEstado(new Contenta(0));
    }

    puedeJugar(mascota: Tamagotchi){
        return false;
    }

    jugar(mascota: Tamagotchi) {
        mascota.setEstado(new MalHumor(0));
    }

}

class MalHumor implements IEstado {

    constructor() {
        this.fechaInicial = moment();
        this.limiteDeMinutos = 80;
    }

    comer(mascota: Tamagotchi) {
      let fechaActual = moment();
      let minutosConEstadoActual = fechaActual.diff(this.fechaInicial, "minutes");
      if(minutosConEstadoActual > this.limiteDeMinutos){
        mascota.setEstado(new Contenta(0));
      }
    }

    puedeJugar(mascota: Tamagotchi){
        return true;
    }

    jugar(mascota: Tamagotchi) {
        mascota.setEstado(new Contenta(0));
    }
}