describe('selectors', () => {
  it('check pagination', () => {
    const pagination = [{ currentPage: 1, totalPages: 0 }];
    const selectPage = (state: { pagination: { currentPage: number; totalPages: number }[] }) => state.pagination;

    const res = selectPage({ pagination });
    expect(res).toEqual(pagination);
  });
});