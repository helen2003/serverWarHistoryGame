import { Module } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import * as path from 'path';
import * as uuid from 'uuid';
import EmptyMessage from './ImageShow';

export const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)();

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

// dynamicImport('adminjs').then(({ AdminJS }) =>
//   dynamicImport('@adminjs/prisma').then(({ Database, Resource }) => {
//     AdminJS.registerAdapter({ Database, Resource });
//   }),
// );

const newFileName = (name: string) => {
  let file_extension = name.slice(
    (Math.max(0, name.lastIndexOf('.')) || Infinity) + 1,
  );
  const fileNameNew = uuid.v4() + `.${file_extension}`;
  return `${fileNameNew}`;
};

@Module({
  imports: [
    dynamicImport('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          const { AdminJS } = await dynamicImport('adminjs');
          const { Database, Resource } = await dynamicImport('@adminjs/prisma');
          const { getModelByName } = await dynamicImport('@adminjs/prisma');
          const prisma = new PrismaService();
          const { default: uploadFileFeature } =
            await dynamicImport('@adminjs/upload');

          const stroka = '<p>Пусто</p>';

          const componentLoader = AdminJS.__unsafe_staticComponentLoader;

          componentLoader.add('imageShow', './ImageShow');
          componentLoader.add('imageList', './ImageList');

          AdminJS.registerAdapter({ Database, Resource });

          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                {
                  resource: {
                    model: getModelByName('Reward'),
                    client: prisma,
                  },
                  options: {
                    properties: {
                      description: {
                        type: 'textarea',
                        isSortable: false,
                      },
                      file: {
                        isVisible: { list: true, edit: true, show: true },
                        components: {
                          show: 'imageShow',
                          list: 'imageList',
                        },
                      },
                    },
                  },
                  features: [
                    uploadFileFeature({
                      componentLoader,
                      provider: {
                        local: {
                          bucket: path.resolve(__dirname, '../..', 'static'),
                          opts: {
                            baseUrl: '/static',
                          },
                        },
                      },
                      properties: {
                        key: 'url',
                      },
                      uploadPath: (record, filename) => {
                        return `${newFileName(filename)}`;
                      },
                      validation: {
                        mimeTypes: ['image/png', 'image/jpeg'],
                      },
                    }),
                  ],
                },
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
                  options: {
                    properties: {
                      file: {
                        isVisible: { list: true, edit: true, show: true },
                        components: {
                          show: 'imageShow',
                          list: 'imageList',
                        },
                      },
                    },
                  },
                  features: [
                    uploadFileFeature({
                      componentLoader,
                      provider: {
                        local: {
                          bucket: path.resolve(__dirname, '../..', 'static'),
                          opts: {
                            baseUrl: '/static',
                          },
                        },
                      },
                      properties: {
                        key: 'url',
                      },
                      uploadPath: (record, filename) => {
                        return `${newFileName(filename)}`;
                      },
                      validation: {
                        mimeTypes: ['image/png', 'image/jpeg'],
                      },
                    }),
                  ],
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
                  options: {
                    properties: {
                      text: {
                        type: 'textarea',
                        isSortable: false,
                        isTitle: true,
                      },
                    },
                  },
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
                  options: {
                    properties: {
                      correct: {
                        description:
                          'В случае типа викторины указывать только true или false',
                      },
                      text: {
                        isTitle: true,
                      },
                    },
                  },
                },
                {
                  resource: {
                    model: getModelByName('FileAnswer'),
                    client: prisma,
                  },
                  options: {
                    properties: {
                      file: {
                        isVisible: { list: true, edit: true, show: true },
                        components: {
                          show: 'imageShow',
                          list: 'imageList',
                        },
                      },
                    },
                  },
                  features: [
                    uploadFileFeature({
                      componentLoader,
                      provider: {
                        local: {
                          bucket: path.resolve(__dirname, '../..', 'static'),
                          opts: {
                            baseUrl: '/static',
                          },
                        },
                      },
                      properties: {
                        key: 'url',
                      },
                      uploadPath: (record, filename) => {
                        return `${newFileName(filename)}`;
                      },
                      validation: {
                        mimeTypes: ['image/png', 'image/jpeg'],
                      },
                    }),
                  ],
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
              componentLoader: componentLoader,
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
        },
      }),
    ),
  ],
})
export class AdminPanelModule {}
