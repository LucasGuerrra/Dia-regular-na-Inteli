//todas as variáveis e a lista que eu usei no código
var player;
var vscode;
var vscode2;
var vscode3;
var vscode4;
var chao;
var chao1;
var chao2;
var note1;
var note2;
var playerChao = false;
var ponto = 0;
var placar1;
var placar2;
var level = 0;
const levels = ['Level 1','Level 2','Level 3','Level 4']

//criando a cena do jogo mesmo e anexando ela ao phaser
class joguin01 extends Phaser.Scene{
    //definindo o nome da cena
    constructor(){
        super({key: "joguin01"});
    };
    
    //função para quando um dos objetos cai no chão 
    colidi(colidivel){
        //vai colocar esse objeto d volta no topo da tela em uma posição x aleatória, definir a velocidade y como 0 para q ele n ganhe velocidade com o tempo, adicionar ponto pro player e redefinir os textos
        colidivel.setPosition(Phaser.Math.RND.between(50, 1150),100);
        colidivel.setVelocityY(500);
        ponto += 1;
        placar1.setText('Pontos: '+ ponto);
        placar2.setText(levels[level]);
        
        //aqui é para cada um dos níveis(a cada nível aparece mais um objeto caindo do céu)
        if(ponto == 25){
            level = 1;
            this.colidi(vscode2);
            ponto -= 1;
            placar1.setText('Pontos: '+ ponto); 
        }
        if(ponto == 75){
            level = 2;
            this.colidi(vscode3);
            ponto -= 1;
            placar1.setText('Pontos: '+ ponto);
        }
        if(ponto == 150){
            level = 3;
            this.colidi(vscode4);
            ponto -= 1;
            placar1.setText('Pontos: '+ ponto);
        }
    }

    preload(){
        //carregando as imagens para o jogo
        this.load.image('bg', 'assetss/joguinbala_inteli.png');
        this.load.spritesheet('personagem','assetss/joguinbala_aluno.png',{frameWidth:64,frameHeight:48});
        this.load.image('vscode','assetss/joguinbala_vscode.png');
        this.load.image('chao','assetss/joguinbala_retangulo.png');
        this.load.image('note','assetss/joguinbala_note.png');
    };
    
    create(){
        //adicionando o teclado para ele poder enviar inputs
        this.cursors = this.input.keyboard.createCursorKeys();
       
        //adicionando o plano de fundo
        this.add.image(600,400, 'bg');
        
        //adicionando os objetos que caem do céu
        vscode = this.physics.add.image(750,100,'vscode').setScale(0.175);
            //esses 3 ficam fora da tela para depois de passar de nível forem realmente adicionado na tela
        vscode2 = this.physics.add.image(-100,0,'vscode').setScale(0.175);
        vscode3 = this.physics.add.image(-100,0,'vscode').setScale(0.175);
        vscode4 = this.physics.add.image(-100,0,'vscode').setScale(0.175);

        //adicionando o player e carregando sua animação
        player = this.physics.add.sprite(600,790,'personagem').setSize(35,48).setScale(1.75);
        player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('personagem',{start:0,end:3}),
            frameRate:10,
            repeat:1
        });

        //adicionando os notebooks que são usados como plataformas
        note1 = this.physics.add.staticImage(150,700,'note').setSize(230,160).setScale(0.6);
        note2 = this.physics.add.staticImage(1050,700,'note').setSize(230,160).setScale(0.6);
        //adicionando as plataformas invisíveis porém colidíveis acima dos notebooks para que o player não possa abusar da colisão lateral dos notebooks para receber pulos extras
        chao = this.physics.add.staticImage(600,798,'chao').setVisible(false).setSize(1200,1);
        chao1 = this.physics.add.staticImage(150,619,'chao').setVisible(false).setSize(228,1);
        chao2 = this.physics.add.staticImage(1050,619,'chao').setVisible(false).setSize(228,1);
       
        //adicionado colisão do player com os notebooks
        this.physics.add.collider(player,note1);
        this.physics.add.collider(player,note2);
        //adicionando colisão do player com as plataformas invisíveis e ativando a variável para que ele possa pular
        this.physics.add.collider(player,chao1, () => {
            playerChao = true;
        });
        this.physics.add.collider(player,chao2, () => {
            playerChao = true;
        });
        this.physics.add.collider(player, chao, () => {
            playerChao = true;
        });



        //adicionando colisão entre todos os objetos que caem do céu e as plataformas
        this.physics.add.collider(vscode, chao, () => {
            this.colidi(vscode);
        });
        this.physics.add.collider(vscode,note1, () => {
            this.colidi(vscode);
        });
        this.physics.add.collider(vscode,note2, () => {
            this.colidi(vscode);
        });
        this.physics.add.collider(vscode2, chao, () => {
            this.colidi(vscode2);
        });
        this.physics.add.collider(vscode2,note1, () => {
            this.colidi(vscode2);
        });
        this.physics.add.collider(vscode2,note2, () => {
            this.colidi(vscode2);
        });
        this.physics.add.collider(vscode3, chao, () => {
            this.colidi(vscode3);
        });
        this.physics.add.collider(vscode3,note1, () => {
            this.colidi(vscode3);
        });
        this.physics.add.collider(vscode3,note2, () => {
            this.colidi(vscode3);
        });
        this.physics.add.collider(vscode4, chao, () => {
            this.colidi(vscode4);
        });
        this.physics.add.collider(vscode4,note1, () => {
            this.colidi(vscode4);
        });
        this.physics.add.collider(vscode4,note2, () => {
            this.colidi(vscode4);
        });

        //se o player enconstar em algum dos vscodes ele volta para a tela de início e perde seus pontos e níveis
        this.physics.add.overlap(player, vscode, () => {
            this.scene.switch('joguin00');
            ponto = 0;
            level = 0;
        });
        this.physics.add.overlap(player, vscode2, () => {
            ponto = 0;
            level = 0;
            this.scene.switch('joguin00');
        });
        this.physics.add.overlap(player, vscode3, () => {
            ponto = 0;
            level = 0;
            this.scene.switch('joguin00');
        });
        this.physics.add.overlap(player, vscode4, () => {
            ponto = 0;
            level = 0;
            this.scene.switch('joguin00');
        });



        //adicionando os textos nas telas dos notebooks que mostrem os pontos e o nível
        placar1 = this.add.text(50,685,'Pontos: ' + ponto,{fontSize:'28px',fill:'#D60270'});
        placar2 = this.add.text(990,685,levels[level],{fontSize:'28px',fill:'#D60270'});

    };
    
    update(){
        //adicionando movimento pro player
        if(this.cursors.left.isDown && this.cursors.right.isDown){
            //quando as duas teclas são pressionada, o player e sua animação param
            player.setVelocityX(0); 
            player.anims.play('andar',false);  
        }else if(this.cursors.left.isDown){
            //quando a esquerda é pressionada, o player se move para esquerda e inicía sua animação
            player.setFlip(true);
            player.setVelocityX(-300);
            player.anims.play('andar',true);
        }else if (this.cursors.right.isDown){       
            //quando a direita é pressionada, o player se move para direita e inicía sua animação           
            player.setFlip(false);
            player.setVelocityX(300);
            player.anims.play('andar',true);
        }else{
            //quando nenhuma tecla é pressionada, para de se mover
            player.setVelocityX(0);
            player.anims.play('andar',false);
        };

        //adiciona o pulo quando o é apertado o cima e o player está em cima de uma das plataformas invisíveis
        if(this.cursors.up.isDown && playerChao == true){
            player.setVelocityY(-400);
            playerChao = false;
        };
    };
};