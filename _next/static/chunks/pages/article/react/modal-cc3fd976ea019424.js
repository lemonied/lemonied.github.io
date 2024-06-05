(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3659],{9792:function(e,n,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/article/react/modal",function(){return o(4960)}])},4960:function(e,n,o){"use strict";o.r(n),o.d(n,{__N_SSG:function(){return _},default:function(){return M},description:function(){return w},frontMatter:function(){return C},tag:function(){return k},title:function(){return b},updated:function(){return g}});var t=o(4246),a=o(1670),l=o(7667),r=o(858),s=o(5818),i=o(53),d=o(5360),c=o(3121),m=o(9481),u=o(4098),f=o.n(u),p=o(8478),x=(0,l.forwardRef)(function(e,n){var o=e.children,a=e.header,r=e.contentClassName,s=e.footer,m=e.afterClose,u=e.maskClosable,x=void 0===u||u,h=(0,l.useRef)(null),v=(0,l.useRef)(null),y=(0,i._)((0,l.useState)(!1),2),_=y[0],C=y[1],b=(0,l.useRef)(),w=(0,l.useRef)(),k=(0,l.useCallback)(function(){var e;null===(e=b.current)||void 0===e||e.resolve("entered")},[]),g=(0,l.useCallback)(function(){var e;null===(e=w.current)||void 0===e||e.resolve("exited")},[]),j=(0,l.useMemo)(function(){return{state:function(){return _},show:function(){return C(!0),b.current=new d.WU,b.current.promise},hide:function(){return C(!1),w.current=new d.WU,w.current.promise},toggle:function(){var e=!_;return(C(e),e)?(b.current=new d.WU,b.current.promise):(w.current=new d.WU,w.current.promise)}}},[_]),N=(0,l.useCallback)(function(e){e.stopPropagation()},[]),M=(0,l.useCallback)(function(){j.hide().then(m)},[m,j]);return(0,l.useEffect)(function(){return _?document.body.classList.add(f()["disable-scroll"]):document.body.classList.remove(f()["disable-scroll"]),function(){return document.body.classList.remove(f()["disable-scroll"])}},[_]),(0,l.useImperativeHandle)(n,function(){return j}),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.CSSTransition,{in:_,classNames:{enter:f()["lemon-modal-fade-enter"],enterActive:f()["lemon-modal-fade-enter-active"],exit:f()["lemon-modal-fade-exit"],exitActive:f()["lemon-modal-fade-exit-active"],exitDone:f()["lemon-modal-fade-exit-done"]},timeout:300,onEntered:k,onExited:g,unmountOnExit:!0,nodeRef:v,children:(0,t.jsx)("div",{ref:v,className:f()["lemon-modal-mask"]})}),(0,t.jsx)(c.CSSTransition,{in:_,classNames:{enter:f()["lemon-modal-enter"],enterActive:f()["lemon-modal-enter-active"],exit:f()["lemon-modal-exit"],exitActive:f()["lemon-modal-exit-active"],exitDone:f()["lemon-modal-exit-done"]},timeout:300,onEntered:k,onExited:g,unmountOnExit:!0,nodeRef:h,children:(0,t.jsx)("div",{ref:h,className:f()["lemon-modal-wrapper"],onClick:function(){return x?M():null},children:(0,t.jsxs)("div",{className:f()["lemon-modal"],onClick:N,children:[null!==a&&(0,t.jsxs)("div",{className:f()["lemon-modal-header"],children:[(0,t.jsx)("div",{className:f()["header-content"],children:a}),(0,t.jsx)(p.J,{className:f().close,type:"close",onClick:M})]}),(0,t.jsx)("div",{className:(0,d.UU)(f()["lemon-modal-content"],r),children:o}),(0,t.jsx)("div",{className:f()["lemon-modal-footer"],children:s})]})})})]})});x.displayName="Modal";var h=(0,l.forwardRef)(function(e,n){var o=(0,i._)((0,l.useState)(),2),a=o[0],d=o[1];return((0,l.useEffect)(function(){var e=document.createElement("div");return e.className="lemon-portal-modal",document.body.appendChild(e),d(e),function(){document.body.removeChild(e)}},[]),a)?(0,m.createPortal)((0,t.jsx)(x,(0,s._)((0,r._)({},e),{ref:n})),a):null});h.displayName="PortalModal";var v=function(){var e=(0,l.useRef)(null);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{onClick:function(){var n;return null===(n=e.current)||void 0===n?void 0:n.show()},children:"弹出Modal"}),(0,t.jsx)(h,{ref:e,header:(0,t.jsx)("h2",{style:{margin:0},children:"Modal 标题"}),footer:(0,t.jsx)("button",{onClick:function(){var n;return null===(n=e.current)||void 0===n?void 0:n.hide()},children:"关闭"}),children:Array(10).fill(1).map(function(e,n){return(0,t.jsx)("p",{children:"Modal 内容"},n)})})]})},y=o(5685),_=!0,C={title:"Modal 弹窗组件",description:"基于react的弹窗实现",tag:["react","typescript","web前端"],updated:"2023-02-22T07:57:53.000Z"},b="Modal 弹窗组件",w="基于react的弹窗实现",k=["react","typescript","web前端"],g="2023-02-22T07:57:53.000Z",j=function(e){return(0,t.jsx)(y.s,e)};function N(e){var n=Object.assign({h2:"h2",p:"p",pre:"pre",code:"code"},(0,a.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"效果",children:"效果"}),"\n",(0,t.jsx)(n.p,{children:"点击按钮"}),"\n",(0,t.jsx)(v,{}),"\n",(0,t.jsx)(n.h2,{id:"示例代码",children:"示例代码"}),"\n",(0,t.jsxs)("details",{children:[(0,t.jsx)("summary",{children:"Typescript"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import { FC, useRef } from 'react';\nimport { ModalInstance, PortalModal } from '@shared/components/modal';\n\nconst ModalExample: FC = () => {\n\n  const modalRef = useRef<ModalInstance>(null);\n\n  return (\n    <>\n      <button onClick={() => modalRef.current?.show()}>弹出Modal</button>\n      <PortalModal\n        ref={modalRef}\n        header={\n          <h2 style={{ margin: 0 }}>Modal 标题</h2>\n        }\n        footer={\n          <button onClick={() => modalRef.current?.hide()}>关闭</button>\n        }\n      >\n        {\n          new Array(10).fill(1).map((_, k) => {\n            return (\n              <p key={k}>Modal 内容</p>\n            );\n          })\n        }\n      </PortalModal>\n    </>\n  );\n};\n\nexport { ModalExample };\n"})})]}),"\n",(0,t.jsx)(n.h2,{id:"组件实现",children:"组件实现"}),"\n",(0,t.jsxs)("details",{open:!0,children:[(0,t.jsx)("summary",{children:"Typescript"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-tsx",children:"import React, {\n  forwardRef,\n  PropsWithChildren,\n  ReactNode,\n  useCallback,\n  useImperativeHandle,\n  useMemo,\n  useRef,\n  useState,\n  MouseEvent,\n  useEffect,\n} from 'react';\nimport { Token, combineClass } from '@shared/utils';\nimport { CSSTransition } from 'react-transition-group';\nimport { createPortal } from 'react-dom';\nimport styles from './modal.module.scss';\nimport { Icon } from '../icons';\n\nconst DURATION = 300;\n\nexport interface ModalInstance {\n  show(): Promise<string>;\n  hide(): Promise<string>;\n  toggle(): Promise<string>;\n  state(): boolean;\n}\ntype ModalProps = PropsWithChildren<{\n  header?: ReactNode;\n  footer?: ReactNode;\n  contentClassName?: string;\n  afterClose?: () => void;\n  maskClosable?: boolean;\n}>;\nexport const Modal = forwardRef<ModalInstance, ModalProps>((props, ref) => {\n\n  const { children, header, contentClassName, footer, afterClose, maskClosable = true } = props;\n\n  const wrapperRef = useRef<HTMLDivElement>(null);\n  const maskRef = useRef<HTMLDivElement>(null);\n  const [show, setShow] = useState(false);\n  const entered = useRef<Token<string>>();\n  const exited = useRef<Token<string>>();\n\n  const onEntered = useCallback(() => {\n    entered.current?.resolve('entered');\n  }, []);\n  const onExited = useCallback(() => {\n    exited.current?.resolve('exited');\n  }, []);\n  const instance = useMemo<ModalInstance>(() => {\n    return {\n      state: () => show,\n      show() {\n        setShow(true);\n        entered.current = new Token();\n        return entered.current.promise;\n      },\n      hide() {\n        setShow(false);\n        exited.current = new Token();\n        return exited.current.promise;\n      },\n      toggle() {\n        const result = !show;\n        setShow(result);\n        if (result) {\n          entered.current = new Token();\n          return entered.current.promise;\n        }\n        exited.current = new Token();\n        return exited.current.promise;\n      },\n    };\n  }, [show]);\n  const preventClick = useCallback((e: MouseEvent<HTMLDivElement>) => {\n    e.stopPropagation();\n  }, []);\n  const handleClose = useCallback(() => {\n    instance.hide().then(afterClose);\n  }, [afterClose, instance]);\n\n  useEffect(() => {\n    if (show) {\n      document.body.classList.add(styles['disable-scroll']);\n    } else {\n      document.body.classList.remove(styles['disable-scroll']);\n    }\n    return () => document.body.classList.remove(styles['disable-scroll']);\n  }, [show]);\n\n  useImperativeHandle(ref, () => {\n    return instance;\n  });\n\n  return (\n    <>\n      <CSSTransition\n        in={show}\n        classNames={{\n          enter: styles['lemon-modal-fade-enter'],\n          enterActive: styles['lemon-modal-fade-enter-active'],\n          exit: styles['lemon-modal-fade-exit'],\n          exitActive: styles['lemon-modal-fade-exit-active'],\n          exitDone: styles['lemon-modal-fade-exit-done'],\n        }}\n        timeout={DURATION}\n        onEntered={onEntered}\n        onExited={onExited}\n        unmountOnExit\n        nodeRef={maskRef}\n      >\n        <div ref={maskRef} className={styles['lemon-modal-mask']} />\n      </CSSTransition>\n      <CSSTransition\n        in={show}\n        classNames={{\n          enter: styles['lemon-modal-enter'],\n          enterActive: styles['lemon-modal-enter-active'],\n          exit: styles['lemon-modal-exit'],\n          exitActive: styles['lemon-modal-exit-active'],\n          exitDone: styles['lemon-modal-exit-done'],\n        }}\n        timeout={DURATION}\n        onEntered={onEntered}\n        onExited={onExited}\n        unmountOnExit\n        nodeRef={wrapperRef}\n      >\n        <div\n          ref={wrapperRef}\n          className={styles['lemon-modal-wrapper']}\n          onClick={() => maskClosable ? handleClose() : null}\n        >\n          <div className={styles['lemon-modal']} onClick={preventClick}>\n            {\n              header !== null && (\n                <div className={styles['lemon-modal-header']}>\n                  <div className={styles['header-content']}>{header}</div>\n                  <Icon className={styles['close']} type={'close'} onClick={handleClose} />\n                </div>\n              )\n            }\n            <div className={combineClass(styles['lemon-modal-content'], contentClassName)}>{children}</div>\n            <div className={styles['lemon-modal-footer']}>{footer}</div>\n          </div>\n        </div>\n      </CSSTransition>\n    </>\n  );\n});\n\nModal.displayName = 'Modal';\n\nexport const PortalModal = forwardRef<ModalInstance, ModalProps>((props, ref) => {\n\n  const [container, setContainer] = useState<HTMLDivElement | undefined>();\n\n  useEffect(() => {\n    const dom = document.createElement('div');\n    dom.className = 'lemon-portal-modal';\n    document.body.appendChild(dom);\n    setContainer(dom);\n    return () => {\n      document.body.removeChild(dom);\n    };\n  }, []);\n\n  if (container) {\n    return createPortal(\n      <Modal { ...props } ref={ref} />,\n      container,\n    );\n  }\n  \n  return null;\n});\n\nPortalModal.displayName = 'PortalModal';\n"})})]}),"\n",(0,t.jsxs)("details",{open:!0,children:[(0,t.jsx)("summary",{children:"CSS"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-scss",children:"$duration: 300ms;\n$zIndex: 999;\n\n.lemon-modal-enter {\n}\n.lemon-modal-enter-active {\n}\n.lemon-modal-exit {\n  opacity: 1;\n  .lemon-modal{\n    transform: scale(1);\n  }\n}\n.lemon-modal-exit-active {\n  transition: opacity $duration ease;\n  opacity: 0;\n  .lemon-modal{\n    transform: scale(0);\n    transition: transform $duration ease;\n  }\n}\n@keyframes lemon-modal-eject {\n  0%{\n    transform: scale(0);\n    opacity: 0;\n  }\n  60%{\n    transform: scale(1.1);\n  }\n  100%{\n    transform: scale(1);\n    opacity: 1;\n  }\n}\n.lemon-modal-fade-enter {\n  opacity: 0;\n}\n.lemon-modal-fade-enter-active {\n  opacity: 1;\n  transition: opacity $duration;\n}\n.lemon-modal-fade-exit {\n  opacity: 1;\n}\n.lemon-modal-fade-exit-active {\n  opacity: 0;\n  transition: opacity $duration;\n}\n.lemon-modal-mask{\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: $zIndex;\n  background: rgba(0, 0, 0, .5);\n}\n.lemon-modal-wrapper{\n  position: fixed;\n  z-index: $zIndex;\n  overflow: auto;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  line-height: 100vh;\n  text-align: center;\n}\n.lemon-modal{\n  display: inline-block;\n  vertical-align: middle;\n  line-height: initial;\n  text-align: initial;\n  border-radius: 8px;\n  width: 500px;\n  max-width: 80%;\n  background: #fff;\n  font-size: 1rem;\n  animation: lemon-modal-eject ease $duration;\n}\n.lemon-modal-header{\n  padding: 20px 20px 10px 20px;\n  display: flex;\n  align-items: center;\n  .header-content{\n    flex: 1;\n    width: calc(100% - 24px);\n  }\n  .close{\n    font-size: 1.4em;\n    &:hover{\n      cursor: pointer;\n      opacity: .9;\n    }\n  }\n}\n.lemon-modal-content{\n  padding: 15px;\n}\n.lemon-modal-footer{\n  padding: 0 15px 15px 15px;\n}\n.disable-scroll{\n  overflow: hidden !important;\n}\n"})})]})]})}var M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,t.jsx)(j,Object.assign({},e,{children:(0,t.jsx)(N,e)}))}},4098:function(e){e.exports={"lemon-modal-exit":"modal_lemon-modal-exit__qJ4Iq","lemon-modal":"modal_lemon-modal__Wsz3W","lemon-modal-exit-active":"modal_lemon-modal-exit-active__ndrGy","lemon-modal-fade-enter":"modal_lemon-modal-fade-enter__pmYIG","lemon-modal-fade-enter-active":"modal_lemon-modal-fade-enter-active__HZzRw","lemon-modal-fade-exit":"modal_lemon-modal-fade-exit__v8_Dz","lemon-modal-fade-exit-active":"modal_lemon-modal-fade-exit-active__3Ahit","lemon-modal-mask":"modal_lemon-modal-mask__rpAbS","lemon-modal-wrapper":"modal_lemon-modal-wrapper__SFRPl","lemon-modal-eject":"modal_lemon-modal-eject__ylgNy","lemon-modal-header":"modal_lemon-modal-header__bSocy","header-content":"modal_header-content__WwExG",close:"modal_close__UsaM5","lemon-modal-content":"modal_lemon-modal-content__2T8II","lemon-modal-footer":"modal_lemon-modal-footer__pchhJ","disable-scroll":"modal_disable-scroll__HJP8v"}},3121:function(e){"use strict";e.exports=ReactTransitionGroup},9378:function(e){"use strict";e.exports=algoliasearch},7513:function(e){"use strict";e.exports=rxjs}},function(e){e.O(0,[9894,2128,3554,5685,9774,2888,179],function(){return e(e.s=9792)}),_N_E=e.O()}]);