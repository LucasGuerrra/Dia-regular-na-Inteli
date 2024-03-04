window.onload =  function(){
    const config = {
        //definindo o tamanho da tela e a cor base background
        type: Phaser.AUTO,
        width: 1200,
        height: 801,
        backgroundColor: "77ddf5",
        //definindo a gravidade
        physics: {
            default: "arcade",
            arcade: {
                gravity:{y:300},  
                debug: false,
            }
        },
        //definido as cenas dentro do jogo
        scene: [joguin00,joguin01]
    }
    //criando o jogo
    let game  = new Phaser.Game(config); 
};