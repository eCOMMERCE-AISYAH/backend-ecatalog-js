function create(name, slug, description, stock, subCategoryId, price) {
  return {
    data: {
      name,
      slug,
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

function getAllByQuery(take, skip, name, subCategory, price) {
  return {
    take: take !== undefined ? Number(take) : undefined,
    skip: skip !== undefined ? Number(skip) : undefined,
    where: {
      name: name !== undefined ? { contains: name } : undefined,
      price: price !== undefined ? Number(price) : undefined,
      subCategory: {
        name: subCategory !== undefined ? subCategory : undefined,
      },
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
      images: true,
    },
  };
}

function getDetail(slug) {
  return {
    where: {
      slug,
    },
    include: {
      subCategory: {
        include: {
          category: true,
        },
      },
      images: true,
    },
  };
}

function update(id, name, slug, description, stock, subCategoryId, price) {
  return {
    data: {
      name,
      slug,
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
  getAllByQuery,
  getDetail,
  update,
  destroy,
};
