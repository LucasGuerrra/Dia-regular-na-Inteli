//criando a cena de início mesmo e anexando ela ao phaser
class joguin00 extends Phaser.Scene{
    //definindo o nome da cena
    constructor(){
            super({key: "joguin00"});
        };
    
        create(){
            //criando o texto de início do jogo
            this.add.text(30, 250, "Vamos jogar esse joguin super bala!", {fill:'#000000', fontSize: '55px'});
            this.add.text(340, 400, "CLIQUE PARA COMEÇAR!", {fill: '#000000', fontSize: '40px'});
            //definindo que quando o botão esquerdo for pressionado a cena muda para o jogo
            this.input.on('pointerdown',() => {
                this.scene.stop('joguin00'),
                this.scene.start('joguin01');
            
            })
        };
    }
    