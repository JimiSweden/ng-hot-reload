import directiveProvider from './directive';
import componentProvider from './component';
import angularProvider from './ng/angular';
import manualReload from './manual-reload';
import {
  getTemplatePathPrefix,
  setTemplatePathPrefix,
  getTemplatePathSuffix,
  setTemplatePathSuffix,
  decorateTemplateRequest,
} from './template';

const modules = new Map();

const decorator = module_ => newProvider => (name, factory) => {
  newProvider.call(module_, name, factory);
  return module_;
};

let templateCache;

function init(angular) {
  console.log('initt');
  angularProvider.setAngular(angular);

  if (!templateCache) {
    templateCache = decorateTemplateRequest();
  }

  return Object.assign({}, angular, {
    module: function(name) {
      if (!modules.has(name)) {
        modules.set(name, {
          directive: directiveProvider(name),
          component: componentProvider(name),
        });
      }

      const module = modules.get(name),
        result = {},
        decorate = decorator(result);

      const patchedModule = Object.assign(
        result,
        angular.module.apply(angular, arguments),
        {
          directive: decorate(module.directive.create),
          component: decorate(module.component.create),
        }
      );

      return patchedModule;
    },
  });
}

function update() {
  console.log('updateee');
  const angular = angularProvider();

  return Object.assign({}, angular, {
    module: function(name) {
      const module = modules.get(name);
      if (!module) {
        manualReload(`New module "${name}".`);
        return;
      }
      const result = {};
      const decorate = decorator(result);

      return Object.assign(result, angular.module(name), {
        directive: decorate(module.directive.update),
        component: decorate(module.component.update),
      });
    },
  });
}

function updateTemplate(filePath, file) {
  if (templateCache) {
    templateCache.update(filePath, file);
  } else {
    manualReload('App was not initialized yet.');
  }
}

const templatesPublicApi = {
  update: updateTemplate,
  getTemplatePathPrefix,
  setTemplatePathPrefix,
  getTemplatePathSuffix,
  setTemplatePathSuffix,
};

export { init, update, manualReload, templatesPublicApi as template };
