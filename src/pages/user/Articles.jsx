import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { 
  BookOpen, 
  User, 
  Users,
  Calendar, 
  Clock, 
  ChevronLeft, 
  Search, 
  ArrowRight,
  MessageSquare,
  Upload,
  Sparkles,
  Inbox,
  Download,
  Dna,
  Baby,
  Heart,
  Stethoscope,
  FileText
} from 'lucide-react';

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const location = useLocation();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/articles`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        // Check if hash exists in URL
        const hash = location.hash.replace('#', '');
        if (hash) {
          const matched = data.find(a => a.slug === hash);
          if (matched) setSelectedArticle(matched);
        }
      })
      .catch(err => console.log('Failed to load articles:', err));
  }, [location.hash]);

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    window.location.hash = article.slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedArticle(null);
    window.location.hash = '';
  };

  // Map chips to article categories / keywords safely
  const categoriesMap = {
    'All': 'All',
    'Genetic Testing': ['Education', 'Genomics', 'Clinical Advice', 'Genetic Testing'],
    'Genetic Counselling': ['Counselling', 'Genetic Counselling'],
    'NIPT': ['Prenatal Screening', 'NIPT'],
    'Wellness Genomics': ['Genomics & Wellness', 'Wellness Genomics'],
    'Pregnancy': ['Reproductive Genetics', 'Pregnancy'],
    'Report Interpretation': ['Report Interpretation', 'Clinical Advice']
  };

  const filteredArticles = articles.filter(a => {
    const search = searchTerm.toLowerCase();
    
    // Search query matches title, summary, category, or keyword if exists
    const matchesSearch = search === '' || 
      a.title?.toLowerCase().includes(search) ||
      a.summary?.toLowerCase().includes(search) ||
      a.category?.toLowerCase().includes(search);
      
    if (!matchesSearch) return false;
    
    // Chip filter matches
    if (activeChip === 'All') return true;
    
    const targetCategories = categoriesMap[activeChip] || [activeChip];
    if (targetCategories.includes(a.category)) return true;
    
    // Fallback: see if title/summary/category matches the chip text
    const chipQuery = activeChip.toLowerCase();
    return (
      a.title?.toLowerCase().includes(chipQuery) ||
      a.summary?.toLowerCase().includes(chipQuery) ||
      a.category?.toLowerCase().includes(chipQuery)
    );
  });

  const getCategoryCount = (category) => {
    if (category === 'All') return articles.length;
    return articles.filter(a => {
      const targetCategories = categoriesMap[category] || [category];
      if (targetCategories.includes(a.category)) return true;
      const chipQuery = category.toLowerCase();
      return (
        a.title?.toLowerCase().includes(chipQuery) ||
        a.summary?.toLowerCase().includes(chipQuery) ||
        a.category?.toLowerCase().includes(chipQuery)
      );
    }).length;
  };

  return (
    <div className="articles-page animate-fade-in bg-wave-lines" style={{ position: 'relative' }}>
      
      {/* Hero Header */}
      <section className="section bg-secondary border-bottom dna-bg-light" style={{ padding: '60px 0 40px' }}>
        <div className="container text-center" style={{ maxWidth: '800px' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '1.2', fontWeight: 800, margin: '12px 0 20px', letterSpacing: '-0.02em' }}>
            Articles & Resources
          </h1>
          <p className="lead-text" style={{ fontSize: 'clamp(1rem, 3vw, 1.12rem)', color: 'var(--text-muted)', lineHeight: '1.7', margin: '0 auto' }}>
            Explore patient-friendly educational content about genetic counselling, wellness genomics, NIPT, genetic testing, and genetic report interpretation.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section id="articles-list" className="section section-light" style={{ padding: '64px 0 80px' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          
          {selectedArticle ? (
            /* Single Article View */
            <div className="card animate-fade-in" style={{ padding: '40px', background: 'var(--bg-secondary)', borderRadius: '24px', maxWidth: '840px', margin: '0 auto', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <button 
                onClick={handleBackToList} 
                className="btn btn-secondary btn-sm flex-row-center gap-2 mb-6"
                style={{ padding: '8px 16px', fontSize: '0.82rem', color: 'var(--text-main)' }}
              >
                <ChevronLeft size={16} /> Back to Articles List
              </button>
              
              <div style={{ marginBottom: '16px' }}>
                <span className="badge badge-accent" style={{ fontSize: '0.7rem', padding: '4px 12px' }}>{selectedArticle.category}</span>
              </div>
              
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.3' }}>
                {selectedArticle.title}
              </h2>
              
              <div className="flex-row gap-4 mb-8 border-bottom pb-4 text-muted xsmall-text" style={{ borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                <div className="flex-row align-center gap-1" style={{ display: 'flex', alignItems: 'center' }}>
                  <User size={14} className="text-secondary" />
                  <span>By {selectedArticle.author}</span>
                </div>
                <div className="flex-row align-center gap-1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Calendar size={14} className="text-accent" />
                  <span>{selectedArticle.date}</span>
                </div>
                <div className="flex-row align-center gap-1" style={{ display: 'flex', alignItems: 'center' }}>
                  <Clock size={14} className="text-secondary" />
                  <span>{selectedArticle.readTime}</span>
                </div>
                
                <div className="flex-row align-center ml-auto" style={{ marginLeft: 'auto' }}>
                  <button
                    onClick={() => {
                      const content = `${selectedArticle.title}\n\nBy ${selectedArticle.author} | ${selectedArticle.date}\n\n${selectedArticle.content}`;
                      const blob = new Blob([content], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `${selectedArticle.slug || 'article'}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}
                    title="Download Article as Text"
                  >
                    <Download size={14} /> Download
                  </button>
                </div>
              </div>

              <div className="article-body-content" style={{ textJustify: 'none', textAlign: 'left' }}>
                {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                  <p 
                    key={index} 
                    className="mb-6" 
                    style={{ 
                      fontSize: '16px', 
                      lineHeight: '1.7', 
                      color: 'var(--text-muted)',
                      wordSpacing: 'normal',
                      letterSpacing: 'normal'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* In-Article Callout Box */}
              <div className="card mt-12 bg-secondary" style={{ padding: '32px', borderRadius: '18px', background: 'rgba(2, 132, 199, 0.03)', borderColor: 'rgba(2, 132, 199, 0.12)' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                  Do you have questions about this topic or need report review?
                </h4>
                <p className="xsmall-text text-muted mb-6" style={{ lineHeight: '1.6' }}>
                  Dr. Lahiru Prabodha provides clinical consultations to interpret DNA reports and map family history risks.
                </p>
                <Link to="/appointments" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                  Book Consultation
                </Link>
              </div>
            </div>
          ) : (
            /* Articles List View */
            <div className="flex-col gap-8">
              
              {/* Search Box & Category Filters Container */}
              <div className="flex-col gap-6 align-center w-full" style={{ maxWidth: '760px', margin: '0 auto' }}>
                
                {/* Search Bar */}
                <div 
                  className="card w-full" 
                  style={{ 
                    padding: '8px 12px 8px 24px', 
                    borderRadius: '16px', 
                    border: '1px solid var(--border-color)', 
                    boxShadow: 'var(--shadow-sm)',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Search size={20} className="text-light" style={{ flexShrink: 0 }} />
                  <input 
                    type="text" 
                    className="form-control" 
                    style={{ 
                      border: 'none', 
                      padding: '12px 16px', 
                      width: '100%', 
                      background: 'transparent',
                      color: 'var(--text-main)',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                    placeholder="Search articles by title, keyword, category, or topic..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Category Chips Selector */}
                <div 
                  className="flex-row gap-2 flex-wrap justify-center w-full" 
                  style={{ 
                    paddingBottom: '4px'
                  }}
                >
                  {['All', 'Genetic Testing', 'Genetic Counselling', 'NIPT', 'Wellness Genomics', 'Pregnancy', 'Report Interpretation'].map((chip) => {
                    const count = getCategoryCount(chip);
                    return (
                      <button
                        key={chip}
                        onClick={() => setActiveChip(chip)}
                        className="btn btn-sm"
                        style={{
                          padding: '8px 16px',
                          fontSize: '0.8rem',
                          borderRadius: '50px',
                          backgroundColor: activeChip === chip ? 'var(--secondary)' : 'var(--bg-primary)',
                          color: activeChip === chip ? 'white' : 'var(--text-main)',
                          border: activeChip === chip ? '1px solid var(--secondary)' : '1px solid var(--border-color)',
                          boxShadow: 'none',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {chip} ({count})
                      </button>
                    );
                  })}
                </div>

              </div>



              {/* Grid List */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-3" style={{ gap: '24px', marginTop: '24px' }}>
                  {filteredArticles.map((article) => {
                    let IconComponent = BookOpen;
                    const catLower = article.category?.toLowerCase() || '';
                    if (catLower.includes('genomic') || catLower.includes('testing')) IconComponent = Dna;
                    else if (catLower.includes('counselling')) IconComponent = Users;
                    else if (catLower.includes('prenatal') || catLower.includes('nipt')) IconComponent = Baby;
                    else if (catLower.includes('wellness')) IconComponent = Heart;
                    else if (catLower.includes('reproductive') || catLower.includes('pregnancy')) IconComponent = Users;
                    else if (catLower.includes('report') || catLower.includes('clinical')) IconComponent = FileText;

                    return (
                      <div 
                        key={article.id} 
                        className="card flex-col-card article-card-upgrade" 
                        style={{ 
                          padding: '24px', 
                          background: 'white', 
                          border: '1px solid var(--border-color)',
                          borderRadius: '22px', 
                          boxShadow: 'var(--shadow-sm)',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)';
                          e.currentTarget.style.borderColor = 'var(--secondary)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'none';
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                      >
                        <div className="flex-row-between align-center mb-4">
                          <span className="badge badge-accent" style={{ fontSize: '0.65rem', padding: '4px 10px', background: 'rgba(2, 132, 199, 0.08)' }}>
                            {article.category}
                          </span>
                          <div style={{ background: 'var(--bg-tertiary)', padding: '6px', borderRadius: '50%' }}>
                            <IconComponent size={14} className="text-secondary" />
                          </div>
                        </div>
                        
                        <h3 
                          style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', cursor: 'pointer', marginBottom: '10px', lineHeight: '1.4' }}
                          onClick={() => handleSelectArticle(article)}
                        >
                          {article.title}
                        </h3>
                        
                        <p 
                          className="xsmall-text text-muted mb-4" 
                          style={{ 
                            lineHeight: '1.6', 
                            textAlign: 'left',
                            flexGrow: 1,
                            minHeight: '60px'
                          }}
                        >
                          {article.summary}
                        </p>
                        
                        <div className="flex-row-between align-center mt-auto pt-4 border-top" style={{ borderTop: '1px solid var(--border-color)' }}>
                          <div className="flex-col gap-1">
                            <span className="xsmall-text font-bold" style={{ fontSize: '0.7rem' }}>The Gene Clinic</span>
                            <div className="flex-row align-center gap-1 text-muted">
                              <Clock size={12} />
                              <span className="xsmall-text" style={{ fontSize: '0.7rem' }}>{article.readTime}</span>
                            </div>
                          </div>
                          <div className="flex-row align-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const content = `${article.title}\n\nBy ${article.author} | ${article.date}\n\n${article.content}`;
                                const blob = new Blob([content], { type: 'text/plain' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${article.slug || 'article'}.txt`;
                                a.click();
                                URL.revokeObjectURL(url);
                              }}
                              className="btn btn-secondary btn-sm"
                              style={{ 
                                padding: '6px 10px', 
                                fontSize: '0.75rem', 
                                color: 'var(--text-main)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '4px'
                              }}
                              title="Download Article"
                            >
                              <Download size={14} /> Download
                            </button>
                            <button 
                              onClick={() => handleSelectArticle(article)} 
                              className="btn btn-primary btn-sm"
                              style={{ 
                                padding: '6px 14px', 
                                fontSize: '0.75rem', 
                                fontWeight: 700, 
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              Read <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div 
                  className="card text-center flex-col align-center justify-center" 
                  style={{ padding: '64px 24px', borderRadius: '24px', background: 'var(--bg-secondary)', maxWidth: '600px', margin: '32px auto 0' }}
                >
                  <div className="flex-row-center text-light mb-4" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-tertiary)' }}>
                    <Search size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontWeight: 700 }}>No articles found</h3>
                  <p className="small-text text-muted" style={{ maxWidth: '440px', margin: '0 auto 24px', lineHeight: '1.6' }}>
                    Try another keyword or choose a different topic.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setActiveChip('All');
                    }} 
                    className="btn btn-secondary" 
                    style={{ padding: '10px 24px' }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Removed final bottom CTA WhatsApp Inquiry to reduce repetition */}

    </div>
  );
}
