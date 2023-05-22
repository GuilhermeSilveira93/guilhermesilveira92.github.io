@echo off
IF "%~1"=="" goto ERRO
IF %1% == back (
  cd C:\Users\Guilherme Silveira\Documents\GitHub\Softrack-NodeJS\back-end
  npm start
  echo Back
  goto END
)
IF %1% == front (
  cd C:\Users\Guilherme Silveira\Documents\GitHub\Softrack-NodeJS\front-end\softrack
  npm start
  echo Front
  goto END
)
IF %1% == sass (
  cd C:\Users\Guilherme Silveira\Documents\GitHub\Softrack-NodeJS\front-end\softrack
  sass --watch src/sass/style.scss:src/index.css
  echo sass
  goto END
)
:ERRO
echo Parâmetro inválido
:END