function create(name, description, stock, subCategoryId, price) {
  return {
    data: {
      name,
      description,
      stock,
      subCategoryId,
      price,
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
    },
  };
}

function getAll(take, skip) {
  return {
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
      images: true,
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
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
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
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
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
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
    },
  };
}

function destroy(id) {
  return {
    where: {
      id,
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
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
