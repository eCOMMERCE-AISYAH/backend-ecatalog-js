function create(name, description, stock, subCategoryId, price) {
  return {
    data: {
      name,
      description,
      stock,
      subCategoryId,
      price,
    },
    select: {
      name: true,
      description: true,
      stock: true,
      subCategory: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      price: true,
    },
  };
}

function getAll(take, skip) {
  return {
    select: {
      name: true,
      description: true,
      stock: true,
      subCategory: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      price: true,
    },
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
  };
}

function getALlBySubCategory(id, take, skip) {
  return {
    where: {
      subCategoryId: id,
    },
    select: {
      name: true,
      description: true,
      stock: true,
      subCategory: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      price: true,
    },
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
  };
}

function getById(id) {
  return {
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      stock: true,
      subCategory: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      price: true,
    },
  };
}

function update(id, name, description, stock, subCategoryId, price) {
  return {
    data: {
      name,
      description,
      stock,
      subCategoryId,
      price,
    },
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      stock: true,
      subCategory: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      price: true,
    },
  };
}

function destroy(id) {
  return {
    where: {
      id,
    },
    select: {
      name: true,
      description: true,
      stock: true,
      subCategory: {
        select: {
          name: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      price: true,
    },
  };
}

export default {
  create,
  getAll,
  getALlBySubCategory,
  getById,
  update,
  destroy,
};
