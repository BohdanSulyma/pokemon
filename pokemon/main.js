const getmain =с => {
    return document.getElementById(с);
  }
  
  var arrow =  getmain('turn-arrow');
  var turn = true;
  var effectTime = 500;
  
  const pikachu = {
    name: 'pikachu',
    baseHP: 100,
    realHP: 100,
    textHP: getmain('health-character'),
    barHP: getmain('progressbar-character'),
    container: document.getElementsByClassName('character')[0]
  }
  
  const charmander = {
    name: 'charmander',
    baseHP: 100,
    realHP: 100,
    textHP: getmain('health-enemy'),
    barHP: getmain('progressbar-enemy'),
    container: document.getElementsByClassName('enemy')[0]
  }
  getmain('enemy-btn-kick').addEventListener('click', function() {
    if (!turn) {
      dealDamage(pikachu);
    } 
  });
  getmain('character-btn-kick').addEventListener('click', function() {
    if (turn) {
      dealDamage(charmander);
    } 
  });
  

  
  const updateHP = player => {
    player.textHP.innerText = player.realHP + ' / ' + player.baseHP;
    player.barHP.style.width = player.realHP + '%';
    player.container.prepend(arrow);
  }
  
  const victory = () => {
    var player;
    if (!turn) player = pikachu;
    else player = charmander;
    getmain('victory-screen').style.display = 'flex';
    getmain('victory-text').innerText = 'Winner ' +  player.name;
    getmain('victory-image').src =  player.container.getElementsByClassName('sprite')[0].src;
  }
  
  const dealDamage = player => {
    turn = !turn;
    var damage = getRand(100);
    player.realHP = player.realHP - damage;
    var dmgEl = document.createElement('span');
    dmgEl.innerText = '-' + damage;
    dmgEl.classList.add('damage');
    player.container.parentElement.appendChild(dmgEl);
    setTimeout(function()
    {
      player.container.style.animation = "";
      dmgEl.remove();
    }, effectTime);
    if (player.realHP < 0) {
      player.realHP = 0;
      victory();
    }
    updateHP(player);
  }
  
  
  
  getmain('restart').addEventListener('click', function() 
  {
    turn = true;
    pikachu.realHP = pikachu.baseHP;
    charmander.realHP = charmander.baseHP;
    updateHP(charmander); updateHP(pikachu);
    getmain('victory-screen').style.display = 'none';
  });


  const getRand = max => {
    return Math.floor(Math.random()*max);
  }