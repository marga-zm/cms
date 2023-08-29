export default function LocaleRoutes(this: any) {
  this.nuxt.hook("pages:extend", (pages: Array<any>) => {
    const localeRoutes = pages.map((page) => {
      return {
        name: `locale-${page.name}`,
        path: `/:locale${page.path}/:dynamicSegment*`,
        file: page.file,
        children: [],
      };
    });

    pages.push(...localeRoutes);
  });
}
