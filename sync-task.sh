git clone git@github.com:zeebe-io/zeebe-modeler.git && \
cd zeebe-modeler && \
git filter-branch --prune-empty --subdirectory-filter client/src/app/tabs/bpmn/custom/ master && \
rm -rf .git && \
cd .. && \
if [ -d "app/custom-modeler/custom/" ]; then rm -Rf app/custom-modeler/custom/ ; fi && \
mkdir -p app/custom-modeler/custom/ && \
cp -a zeebe-modeler/. app/custom-modeler/custom/ && \
rm -Rf zeebe-modeler/ && \
find . -name __tests__ -type d -exec rm -rf {} \;
