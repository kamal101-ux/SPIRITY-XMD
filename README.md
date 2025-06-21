# ============== SPIRITY-XMD ============= 
 <br/>
</div>
<p align="center">
  <img src="https://i.imgur.com/LyHic3i.gif" />
</p>

<p align="center">
  <img src="https://files.catbox.moe/zmhz85.jpg" />
</p>

<p align="center">
  <img src="https://i.imgur.com/LyHic3i.gif" />
</p>
<p align="center">
  <img src="https://i.imgur.com/LyHic3i.gif" />
</p>


### <br>   DEPLOY_KOYEB 
---------

<a href='https://app.koyeb.com/auth/signin' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/-KOYEB-blue?style=for-the-badge&logo=koyeb&logoColor=white'/></a>

------------

### <br>   DEPLOY_RAILWAY 


-------------

<a href='https://railway.app/new' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/RAILWAY-h?color=black&style=for-the-badge&logo=railway'/></a></p>

---------------

### <br>  MORE DEPLOY METHOD 

--------

### <br>    DEPLOY_GLITCH 

<a href='https://glitch.com/signup' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/GLITCH-h?color=pink&style=for-the-badge&logo=glitch'/></a></p>

--------

### <br>    DEPLOY_CODESPACE 

<a href='https://github.com/codespaces/new' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/CODESPACE-h?color=navy&style=for-the-badge&logo=visualstudiocode'/></a></p>

--------

### <br>    DEPLOY_RENDER 

<a href='https://dashboard.render.com' target="_blank"><img alt='DEPLOY' src='https://img.shields.io/badge/RENDER-h?color=maroon&style=for-the-badge&logo=render'/></a></p>



⚡ DEPLOY ON WORKFLOW ⚡

```

name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 */6 * * *'  

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Install FFmpeg
      run: sudo apt-get install -y ffmpeg

    - name: Start application with timeout
      run: |
        timeout 21590s npm start  # Limite l'exécution à 5h 59m 50s

    - name: Save state (Optional)
      run: |
        ./save_state.sh
```

1. SEVER-SESSION ID
   <br/>
   
<p align="center">
  <img src="https://i.imgur.com/LyHic3i.gif" />
</p>

<p align="center">
  <img src="https://i.imgur.com/LyHic3i.gif" />
</p>
   <br/>
<a href="https://spirity-xmd-pair.onrender.com/pair"><img src="https://img.shields.io/badge/SESSION_ID-blue" alt="Click Here to Get Pair-Code" width="110"></a>


<p align="center">
  <img src="https://i.imgur.com/LyHic3i.gif" />
</p>
<p align="center">
  <img src="https://i.imgur.com/LyHic3i.gif" />
</p>


### 🚀 Fork the Repository

To start, fork this repository to your own GitHub account by clicking the button below:

<a href="https://github.com/DARKMAN226/SPIRITY-XMD/fork"><img src="https://img.shields.io/github/forks/DARKMAN226/SPIRITY-XMD?style=for-the-badge&logo=github&color=4c1&label=Fork%20SPIRITY-XMD" alt="Fork SPIRITY-XD" /></a>

##Session ID 2 Serveur: https://spirity-xmd-pair.onrender.com/pair
