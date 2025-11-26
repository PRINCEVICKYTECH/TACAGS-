import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ClassSelector } from './components/ClassSelector';
import { SubjectSelector } from './components/SubjectSelector';
import { TopicList } from './components/TopicList';
import { NoteView } from './components/NoteView';
import { ViewState, ClassLevel, Subject } from './types';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'HOME' });

  const goHome = () => setViewState({ type: 'HOME' });

  const handleClassSelect = (classLevel: ClassLevel) => {
    setViewState({ type: 'SUBJECT_SELECT', classLevel });
  };

  const handleSubjectSelect = (subject: Subject) => {
    if (viewState.type === 'SUBJECT_SELECT') {
      setViewState({ 
        type: 'TOPIC_SELECT', 
        classLevel: viewState.classLevel, 
        subject 
      });
    }
  };

  const handleTopicSelect = (topic: string) => {
    if (viewState.type === 'TOPIC_SELECT') {
      setViewState({
        type: 'NOTE_VIEW',
        classLevel: viewState.classLevel,
        subject: viewState.subject,
        topic
      });
    }
  };

  const handleBack = () => {
    switch (viewState.type) {
      case 'SUBJECT_SELECT':
        setViewState({ type: 'HOME' });
        break;
      case 'TOPIC_SELECT':
        setViewState({ type: 'SUBJECT_SELECT', classLevel: viewState.classLevel });
        break;
      case 'NOTE_VIEW':
        setViewState({ type: 'TOPIC_SELECT', classLevel: viewState.classLevel, subject: viewState.subject });
        break;
      default:
        break;
    }
  };

  return (
    <Layout onHomeClick={goHome}>
      {viewState.type === 'HOME' && (
        <ClassSelector onSelectClass={handleClassSelect} />
      )}

      {viewState.type === 'SUBJECT_SELECT' && (
        <SubjectSelector 
          classLevel={viewState.classLevel}
          onSelectSubject={handleSubjectSelect}
          onBack={handleBack}
        />
      )}

      {viewState.type === 'TOPIC_SELECT' && (
        <TopicList 
          classLevel={viewState.classLevel}
          subject={viewState.subject}
          onSelectTopic={handleTopicSelect}
          onBack={handleBack}
        />
      )}

      {viewState.type === 'NOTE_VIEW' && (
        <NoteView
          topic={viewState.topic}
          subject={viewState.subject}
          classLevel={viewState.classLevel}
          onBack={handleBack}
        />
      )}
    </Layout>
  );
};

export default App;
