import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import * as path from 'path';

const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)();

// const uploadModule = await dynamicImport('@adminjs/upload');
// const uploadFeature = uploadModule.default;

// const adminjs = await dynamicImport('adminjs');
// const { ComponentLoader } = adminjs;
// const componentLoader = new ComponentLoader();

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

dynamicImport('adminjs').then(({ AdminJS }) =>
  dynamicImport('@adminjs/prisma').then(({ Database, Resource }) => {
    AdminJS.registerAdapter({ Database, Resource });
  }),
);

@Module({
  imports: [
    dynamicImport('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: () =>
          dynamicImport('@adminjs/prisma').then(({ getModelByName }) => {
            const prisma = new PrismaService();
            return {
              adminJsOptions: {
                rootPath: '/admin',
                resources: [
                  {
                    resource: {
                      model: getModelByName('Rank'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('User'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Disciplina'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Topic'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Subtopic'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('TheoryMaterial'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('PracticMaterial'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('TypeFile'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('TypeTask'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('TypeMiniGame'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('ScaleImportant'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('ScaleRecognition'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('ModelNS'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('TypeReward'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Reward'),
                      client: prisma,
                    },
                    options: {},
                    // features: [
                    //   uploadFeature({
                    //     provider: {
                    //       local: {
                    //         path: path.resolve(__dirname, '../..', 'static'),
                    //         baseUrl: '/static',
                    //       },
                    //     },
                    //     properties: {
                    //       url: {
                    //         label: 'Изображение',
                    //         isSortable: true,
                    //         isVisible: {
                    //           list: true,
                    //           show: true,
                    //           edit: true,
                    //         },
                    //       },
                    //     },
                    //   }),
                    // ],
                  },
                  {
                    resource: {
                      model: getModelByName('Achievement'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Question'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Testing'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Answer'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('FileAnswer'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('ResponceTesting'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('ResponceTemplate'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('ResultRecognition'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('ParameterNS'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('CalculationNS'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Rating'),
                      client: prisma,
                    },
                    options: {},
                  },
                ],
              },
              auth: {
                authenticate,
                cookieName: 'adminjs',
                cookiePassword: 'secret',
              },
              sessionOptions: {
                resave: true,
                saveUninitialized: true,
                secret: 'secret',
              },
            };
          }),
      }),
    ),
  ],
})
export class AdminPanelModule {}
