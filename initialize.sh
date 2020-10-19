echo " Executing necessary scripts " 
git config --local core.hooksPath .githooks/    
cd .githooks 
chmod 500 pre-commit 
chmod 500 pre-push
echo "We are done here"