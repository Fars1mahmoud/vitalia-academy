import React, { useState, useMemo } from 'react';
import { Course, CourseLevel } from '../../types';
import { CATEGORIES } from '../../services/mockData';
import { useI18n } from '../../i18n/I18nContext';
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Clock,
  BookOpen,
  Bookmark,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface CourseCatalogPageProps {
  courses: Course[];
  bookmarks: string[];
  enrolledCourseIds: string[];
  initialCategory?: string;
  initialQuery?: string;
  onToggleBookmark: (courseId: string) => void;
  onSelectCourse: (course: Course) => void;
}

export const CourseCatalogPage: React.FC<CourseCatalogPageProps> = ({
  courses,
  bookmarks,
  enrolledCourseIds,
  initialCategory = 'all',
  initialQuery = '',
  onToggleBookmark,
  onSelectCourse,
}) => {
  const { language, t } = useI18n();
  const isAr = language === 'ar';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<'all' | 'free' | 'paid'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'newest'>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const ITEMS_PER_PAGE = 8;

  // Filter and sort
  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle =
            c.title.toLowerCase().includes(q) ||
            c.titleAr.toLowerCase().includes(q);
          const matchesSubtitle =
            c.subtitle.toLowerCase().includes(q) ||
            c.subtitleAr.toLowerCase().includes(q);
          const matchesInstructor =
            c.instructorName.toLowerCase().includes(q) ||
            c.instructorNameAr.toLowerCase().includes(q);
          if (!matchesTitle && !matchesSubtitle && !matchesInstructor) return false;
        }

        // Category
        if (selectedCategory !== 'all' && c.categoryId !== selectedCategory) {
          return false;
        }

        // Level
        if (selectedLevel !== 'all' && c.level !== selectedLevel) {
          return false;
        }

        // Price
        if (selectedPrice === 'free' && c.priceEGP > 0) return false;
        if (selectedPrice === 'paid' && c.priceEGP === 0) return false;

        // Language
        if (selectedLanguage !== 'all' && c.language !== selectedLanguage) {
          return false;
        }

        // Rating
        if (selectedRating > 0 && c.rating < selectedRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return b.enrolledCount - a.enrolledCount; // popularity
      });
  }, [
    courses,
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedPrice,
    selectedLanguage,
    selectedRating,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSelectedLanguage('all');
    setSelectedRating(0);
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedLevel !== 'all' ||
    selectedPrice !== 'all' ||
    selectedLanguage !== 'all' ||
    selectedRating > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E8E7E4] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#7B1E3A] uppercase tracking-wider">
            {isAr ? 'الدليل الأكاديمي الشامل' : 'Academic Course Repository'}
          </span>
          <h1 className="text-3xl font-bold text-[#123B70] font-serif mt-1">
            {t('nav_courses')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {isAr
              ? `عرض ${filteredCourses.length} مقرراً دراسياً معتمداً عبر مختلف الكليات`
              : `Showing ${filteredCourses.length} accredited curricula across university departments`}
          </p>
        </div>

        {/* View mode toggle & sorting */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#123B70] text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#123B70] text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-700 focus:outline-hidden focus:ring-1 focus:ring-[#123B70]"
          >
            <option value="popularity">{isAr ? 'الأكثر تسجيلاً' : 'Most Popular'}</option>
            <option value="rating">{isAr ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
            <option value="newest">{isAr ? 'الأحدث إصداراً' : 'Recently Added'}</option>
          </select>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-[#123B70] text-white rounded-md text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{t('btn_filter')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters Sidebar (Desktop) */}
        <div className="hidden md:block space-y-6 bg-white p-5 rounded-xl border border-[#E8E7E4] shadow-2xs h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <span className="font-bold text-xs uppercase tracking-wider text-[#123B70] flex items-center gap-2">
              <Filter className="w-3.5 h-3.5" />
              {isAr ? 'تصفية النتائج' : 'Filter Criteria'}
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-[11px] text-[#7B1E3A] hover:underline font-semibold"
              >
                {t('btn_clear')}
              </button>
            )}
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1.5">
              {t('btn_search')}
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2 left-2.5 rtl:right-2.5 rtl:left-auto" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={isAr ? 'ابحث عن مقرر...' : 'Search courses...'}
                className="w-full text-xs pl-8 pr-3 rtl:pr-8 rtl:pl-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-1 focus:ring-[#123B70]"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2">
              {t('nav_categories')}
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className={`w-full text-start px-2 py-1.5 rounded transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#123B70] text-white font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {t('lbl_all_categories')}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-start px-2 py-1.5 rounded flex items-center justify-between transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#123B70] text-white font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="truncate">{isAr ? cat.nameAr : cat.name}</span>
                  <span className="text-[10px] opacity-75">({cat.courseCount})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2">
              {t('lbl_level')}
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', en: 'All Levels', ar: 'كافة المستويات' },
                { id: 'beginner', en: 'Beginner', ar: 'مبتدئ' },
                { id: 'intermediate', en: 'Intermediate', ar: 'متوسط' },
                { id: 'advanced', en: 'Advanced', ar: 'متقدم' },
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => {
                    setSelectedLevel(lvl.id);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-start px-2 py-1.5 rounded transition-colors ${
                    selectedLevel === lvl.id
                      ? 'bg-[#7B1E3A] text-white font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isAr ? lvl.ar : lvl.en}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2">
              {t('lbl_price')}
            </label>
            <div className="grid grid-cols-3 gap-1 text-xs">
              {[
                { id: 'all', en: 'All', ar: 'الكل' },
                { id: 'free', en: 'Free', ar: 'مجاني' },
                { id: 'paid', en: 'Paid', ar: 'مدفوع' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedPrice(p.id as any);
                    setCurrentPage(1);
                  }}
                  className={`py-1.5 rounded text-center border font-medium transition-colors ${
                    selectedPrice === p.id
                      ? 'bg-[#123B70] text-white border-[#123B70]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {isAr ? p.ar : p.en}
                </button>
              ))}
            </div>
          </div>

          {/* Instruction Language */}
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2">
              {t('lbl_language')}
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', en: 'All Languages', ar: 'كافة اللغات' },
                { id: 'English', en: 'English', ar: 'الإنجليزية' },
                { id: 'Arabic', en: 'Arabic', ar: 'العربية' },
                { id: 'Bilingual', en: 'Bilingual', ar: 'ثنائي اللغة' },
              ].map((lng) => (
                <button
                  key={lng.id}
                  onClick={() => {
                    setSelectedLanguage(lng.id);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-start px-2 py-1.5 rounded transition-colors ${
                    selectedLanguage === lng.id
                      ? 'bg-[#123B70] text-white font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {isAr ? lng.ar : lng.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Listing Area */}
        <div className="md:col-span-3 space-y-6">
          {paginatedCourses.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E8E7E4] p-12 text-center space-y-3">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="text-base font-bold text-[#123B70]">
                {isAr ? 'لم يتم العثور على مقررات مطابقة' : 'No Courses Matched Your Filter'}
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {isAr
                  ? 'جرب تقليل خيارات التصفية أو البحث عن مسمى مقرر آخر.'
                  : 'Try broadening your search query or clearing your filter criteria.'}
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-2 px-4 py-2 bg-[#123B70] text-white rounded-md text-xs font-semibold"
              >
                {t('btn_clear')}
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCourses.map((course) => {
                const isBookmarked = bookmarks.includes(course.id);
                const isEnrolled = enrolledCourseIds.includes(course.id);
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-[#E8E7E4] hover:border-[#123B70]/40 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
                  >
                    <div className="relative h-44 overflow-hidden bg-gray-100">
                      <img
                        src={course.thumbnail}
                        alt={isAr ? course.titleAr : course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#123B70] text-white">
                          {isAr ? course.categoryNameAr : course.categoryName}
                        </span>
                      </div>
                      <button
                        onClick={() => onToggleBookmark(course.id)}
                        className={`absolute top-2.5 right-2.5 rtl:right-auto rtl:left-2.5 p-1.5 rounded-full backdrop-blur-xs transition-colors ${
                          isBookmarked
                            ? 'bg-[#7B1E3A] text-white'
                            : 'bg-black/40 text-white hover:bg-black/60'
                        }`}
                        aria-label="Save Course"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                      {isEnrolled && (
                        <div className="absolute bottom-2.5 right-2.5 rtl:right-auto rtl:left-2.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                            {isAr ? 'ملتحق بالمقرر' : 'Enrolled'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-1 text-[#B79A62] text-xs font-bold mb-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{course.rating.toFixed(2)}</span>
                          <span className="text-gray-400 font-normal">({course.ratingsCount})</span>
                        </div>

                        <h3
                          onClick={() => onSelectCourse(course)}
                          className="font-bold text-sm text-[#252A34] group-hover:text-[#123B70] transition-colors cursor-pointer line-clamp-2 leading-snug"
                        >
                          {isAr ? course.titleAr : course.title}
                        </h3>

                        <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            {course.durationHours} {t('lbl_hours')}
                          </span>
                          <span>•</span>
                          <span>{course.lessonsCount} {t('lbl_lessons')}</span>
                          <span>•</span>
                          <span className="capitalize">{course.level}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={course.instructorAvatar}
                            alt={course.instructorName}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-[11px] font-medium text-gray-700 truncate max-w-[90px]">
                            {isAr ? course.instructorNameAr : course.instructorName}
                          </span>
                        </div>

                        <div>
                          {course.priceEGP === 0 ? (
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                              {t('lbl_free')}
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-[#123B70]">
                              {course.priceEGP} {t('currency_egp')}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectCourse(course)}
                        className="w-full py-2 rounded-md bg-[#F8F6F2] hover:bg-[#123B70] text-[#123B70] hover:text-white font-semibold text-xs transition-colors text-center"
                      >
                        {t('btn_view_details')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {paginatedCourses.map((course) => {
                const isBookmarked = bookmarks.includes(course.id);
                const isEnrolled = enrolledCourseIds.includes(course.id);
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-xl border border-[#E8E7E4] hover:border-[#123B70]/40 p-4 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-center group"
                  >
                    <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <img
                        src={course.thumbnail}
                        alt={isAr ? course.titleAr : course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 rtl:left-auto rtl:right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#123B70] text-white">
                        {isAr ? course.categoryNameAr : course.categoryName}
                      </span>
                    </div>

                    <div className="flex-1 space-y-2 text-start">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-[#B79A62] text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{course.rating.toFixed(2)}</span>
                          <span className="text-gray-400 font-normal">({course.ratingsCount})</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{course.language}</span>
                      </div>

                      <h3
                        onClick={() => onSelectCourse(course)}
                        className="font-bold text-base text-[#252A34] group-hover:text-[#123B70] transition-colors cursor-pointer"
                      >
                        {isAr ? course.titleAr : course.title}
                      </h3>

                      <p className="text-xs text-gray-500 line-clamp-2">
                        {isAr ? course.subtitleAr : course.subtitle}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                        <span>{isAr ? course.instructorNameAr : course.instructorName}</span>
                        <span>•</span>
                        <span>{course.durationHours} {t('lbl_hours')}</span>
                        <span>•</span>
                        <span>{course.lessonsCount} {t('lbl_lessons')}</span>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0 sm:border-s sm:border-gray-100 sm:ps-5">
                      <div className="text-end">
                        {course.priceEGP === 0 ? (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            {t('lbl_free')}
                          </span>
                        ) : (
                          <span className="text-sm font-extrabold text-[#123B70]">
                            {course.priceEGP} {t('currency_egp')}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleBookmark(course.id)}
                          className={`p-2 rounded-md border transition-colors ${
                            isBookmarked
                              ? 'bg-[#7B1E3A] text-white border-[#7B1E3A]'
                              : 'border-gray-300 text-gray-500 hover:bg-gray-100'
                          }`}
                          aria-label="Bookmark Course"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="px-4 py-2 bg-[#123B70] hover:bg-[#7B1E3A] text-white rounded-md text-xs font-semibold transition-colors"
                        >
                          {t('btn_view_details')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 text-xs">
              <span className="text-gray-500">
                {isAr
                  ? `صفحة ${currentPage} من ${totalPages}`
                  : `Page ${currentPage} of ${totalPages}`}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded border border-gray-300 bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{t('btn_previous')}</span>
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 rounded text-xs font-bold transition-colors ${
                      currentPage === i + 1
                        ? 'bg-[#123B70] text-white'
                        : 'border border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded border border-gray-300 bg-white disabled:opacity-40 hover:bg-gray-50 transition-colors flex items-center gap-1"
                >
                  <span>{t('btn_next')}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
